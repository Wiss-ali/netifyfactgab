import { useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { getMonthName } from "@/lib/date-utils";

const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

interface PeriodSectionProps {
  values: {
    month: number;
    dateFacturation: string;
    dateEcheance: string;
  };
  setFieldValue: (field: string, value: any) => void;
}

export default function PeriodSection({ values, setFieldValue }: PeriodSectionProps) {
  useEffect(() => {
    if (values.dateFacturation) {
      const factDate = new Date(values.dateFacturation);
      const echeanceDate = new Date(factDate);
      echeanceDate.setDate(factDate.getDate() + 1);
      setFieldValue("dateEcheance", format(echeanceDate, "yyyy-MM-dd"));
    }
  }, [values.dateFacturation, setFieldValue]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Mois de facturation</Label>
          <Select
            value={values.month.toString()}
            onValueChange={(value) => setFieldValue("month", parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un mois" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {getMonthName(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dateFacturation">Date de facturation</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !values.dateFacturation && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {values.dateFacturation ? (
                  format(new Date(values.dateFacturation), "d MMMM yyyy", {
                    locale: fr,
                  })
                ) : (
                  <span>Sélectionnez une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  values.dateFacturation
                    ? new Date(values.dateFacturation)
                    : undefined
                }
                onSelect={(date) =>
                  setFieldValue(
                    "dateFacturation",
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dateEcheance">Date d'échéance</Label>
          <Input
            id="dateEcheance"
            value={
              values.dateEcheance
                ? format(new Date(values.dateEcheance), "d MMMM yyyy", {
                    locale: fr,
                  })
                : ""
            }
            disabled
            className="text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}