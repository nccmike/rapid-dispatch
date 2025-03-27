
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Phone, Send, MapPin, User, Calendar } from "lucide-react";

interface FormData {
  customerName: string;
  callerName: string;
  callerNumber: string;
  driverName: string;
  driverNumber: string;
  lossLocation: string;
  accidentDescription: string;
}

interface IncidentFormProps {
  onSubmit: (data: FormData) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    callerName: '',
    callerNumber: '',
    driverName: '',
    driverNumber: '',
    lossLocation: '',
    accidentDescription: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerName || !formData.callerNumber || !formData.lossLocation || !formData.accidentDescription) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would call Supabase or another API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      onSubmit(formData);
      toast.success("Incident reported successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit incident. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-gray-100 glass-card overflow-hidden animate-slide-up">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-xl flex items-center gap-2">
          <Phone className="h-5 w-5" /> New Incident Report
        </CardTitle>
        <CardDescription className="text-blue-100">
          Fill out the form below to notify adjusters in the area
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 appear-animation">
          <div className="grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Customer/Client <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="callerName" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Caller Name
                </Label>
                <Input
                  id="callerName"
                  name="callerName"
                  placeholder="Enter caller name"
                  value={formData.callerName}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="callerNumber" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Caller Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="callerNumber"
                  name="callerNumber"
                  placeholder="Enter caller number"
                  value={formData.callerNumber}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driverName" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Driver Name
                </Label>
                <Input
                  id="driverName"
                  name="driverName"
                  placeholder="Enter driver name"
                  value={formData.driverName}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="driverNumber" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" /> Driver Number
                </Label>
                <Input
                  id="driverNumber"
                  name="driverNumber"
                  placeholder="Enter driver number"
                  value={formData.driverNumber}
                  onChange={handleChange}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lossLocation" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Loss Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lossLocation"
                  name="lossLocation"
                  placeholder="Enter loss location"
                  value={formData.lossLocation}
                  onChange={handleChange}
                  className="glass-input"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accidentDescription" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Brief Accident Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="accidentDescription"
                name="accidentDescription"
                placeholder="Provide a brief description of the accident"
                value={formData.accidentDescription}
                onChange={handleChange}
                className="glass-input min-h-[100px]"
                required
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2 border-t p-4 bg-gray-50/50">
          <Button variant="outline" type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit & Notify Adjusters
              </div>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default IncidentForm;
