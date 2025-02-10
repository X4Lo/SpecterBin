import React, { useState, useEffect } from "react";
import { pastesService } from "../services/pastesService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PasteObject } from "@/types/PasteObject";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "@/hooks/use-toast";

const MyPastesPage: React.FC = () => {
  const [pastes, setPastes] = useState<PasteObject[]>([]);
  const [selectedPastes, setSelectedPastes] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pasteToDelete, setPasteToDelete] = useState<string | null>();
  const [pastesToDelete, setPastesToDelete] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.getCurrentAccountNumber()) {
      navigate("/login");
      return;
    }

    const currentAccountNumber = authService.getCurrentAccountNumber()!;

    const fetchPastes = async () => {
      try {
        const data = await pastesService.getPastesByAccountNumber(
          currentAccountNumber
        );
        setPastes(data);
      } catch (error) {
        console.error("Failed to fetch pastes:", error);
      }
    };
    fetchPastes();
  }, []);

  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paste.id!.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPaste = (pasteId: string) => {
    if (selectedPastes.includes(pasteId)) {
      setSelectedPastes(selectedPastes.filter((id) => id !== pasteId));
    } else {
      setSelectedPastes([...selectedPastes, pasteId]);
    }
  };

  const handleDeletePaste = (pasteId: string) => {
    setSelectedPastes([]);
    setPasteToDelete(pasteId);
    setConfirmDialogMessage(`Do you want to delete the paste: ${pasteId} ?`);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteSelected = () => {
    setPasteToDelete(null);
    setPastesToDelete(selectedPastes);
    setConfirmDialogMessage(
      `Do you want to delete ${selectedPastes.length} pastes?`
    );
    setIsConfirmDialogOpen(true);
  };

  const handleClose = () => {
    setIsConfirmDialogOpen(false);
    setPasteToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const accountNumber = authService.getCurrentAccountNumber();

      if (!accountNumber) {
        toast({
          title: "Error",
          description: "You are not logged in.",
          variant: "destructive",
        });
        return;
      }

      if (pasteToDelete) {
        await pastesService.deletePasteById(pasteToDelete, accountNumber);
        setPastes(pastes.filter((paste) => paste.id !== pasteToDelete));

        toast({
          title: "Success",
          description: `Paste deleted.`,
        });
      } else if (pastesToDelete.length > 0) {
        await Promise.all(
          pastesToDelete.map((id) =>
            pastesService.deletePasteById(id, accountNumber)
          )
        );

        setPastes((prevPastes) =>
          prevPastes.filter((paste) => !pastesToDelete.includes(paste.id!))
        );

        toast({
          title: "Success",
          description: `${pastesToDelete?.length} pastes deleted.`,
        });

        setPastesToDelete([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error + "",
        variant: "destructive",
      });
    } finally {
      setIsConfirmDialogOpen(false);
      setPasteToDelete(null);
    }
  };

  return (
    <div className="flex-1 bg-background p-6 overflow-auto">
      <div className="container mx-auto max-w-5xl z-30">
        <div className="flex justify-between items-center mb-6">
          <Input
            type="text"
            placeholder="Search by title or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={selectedPastes.length === 0}
          >
            Delete Selected
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={selectedPastes.length === filteredPastes.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPastes(
                        filteredPastes.map((paste) => paste.id!)
                      );
                    } else {
                      setSelectedPastes([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Title/ID</TableHead>
              <TableHead>Burn</TableHead>
              <TableHead>Protected</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPastes.map((paste) => (
              <TableRow key={paste.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPastes.includes(paste.id!)}
                    onCheckedChange={() => handleSelectPaste(paste.id!)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{paste.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {paste.id}
                  </div>
                </TableCell>
                <TableCell>{paste.burnAfterRead ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {paste.isPasswordProtected ? "Yes" : "No"}
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePaste(paste.id!)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          message={confirmDialogMessage}
          onClose={handleClose}
          onSubmit={confirmDelete}
        ></ConfirmDialog>
      </div>
    </div>
  );
};

export default MyPastesPage;
