
import { Button } from "@/components/ui/button";
import { useSeedData } from "@/hooks/useSeedData";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SeedDataButton() {
  const { seedData, isSeeding, error, success } = useSeedData();
  const { toast } = useToast();

  const handleSeedData = async () => {
    await seedData();
    
    if (error) {
      toast({
        title: "Error seeding data",
        description: error.message,
        variant: "destructive",
      });
    } else if (success) {
      toast({
        title: "Data seeded successfully",
        description: "Sample companies, contacts, deals, and activities have been created.",
        variant: "default",
      });
    }
  };

  return (
    <Button 
      onClick={handleSeedData} 
      disabled={isSeeding}
      variant="outline"
      className="w-full"
    >
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding Data...
        </>
      ) : (
        "Seed Sample Data"
      )}
    </Button>
  );
}
