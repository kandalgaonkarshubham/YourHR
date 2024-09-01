import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "lib/utils";
import { Button } from "shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "shadcn/popover";

export default function Locationbox({
  className,
  name,
  data,
  setUpdatedInfo,
  selected = "",
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selected);
  const handleChange = (v) => {
    setValue(v);
    if (setUpdatedInfo) {
      setUpdatedInfo((prev) => ({
        ...prev,
        [name]: v,
      }));
    }
  };

return (
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        disabled={disabled}
      >
        {value
          ? data.find((item) => item.name == value)?.name
          : "Select Country..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command className="w-full">
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.name}
                value={item.name}
                onSelect={(currentValue) => {
                  handleChange(currentValue == value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value == item.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
);
}
