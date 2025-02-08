import React from "react";
import { Calendar } from "@/components/ui/calendar"; // shadcn/ui Calendar
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // shadcn/ui Popover
import { format } from "date-fns";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { CalendarIcon } from "lucide-react"; // Icon for the input

interface DateTimeInputProps {
  value: { value: Date | undefined; onChange: (date: Date | undefined) => void };
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ value }) => {
  const { value: selectedDate, onChange } = value;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onChange} // Update the form field value
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateTimeInput;