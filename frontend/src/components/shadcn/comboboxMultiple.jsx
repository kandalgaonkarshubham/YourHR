import { useState } from "react";
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

export default function ComboboxMultiple({
  name,
  data,
  setUpdatedInfo,
  selected = "",
}) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    selected ? selected.split(",") : []
  );

  const handleSelect = (value) => {
    setSelectedValues((prev) => {
      const newSelectedValues = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      setSelectedValues(newSelectedValues);

      setUpdatedInfo((prev) => ({
        ...prev,
        [name]: newSelectedValues,
      }));

      return newSelectedValues;
    });
  };

  const selectedItems = data.filter((item) =>
    selectedValues.includes(item.name)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between whitespace-normal"
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => item.name).join(", ")
            : "Select Item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => handleSelect(item.name)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.name)
                        ? "opacity-100"
                        : "opacity-0"
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
