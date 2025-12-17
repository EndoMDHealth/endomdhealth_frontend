import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  HelpCircle, 
  CalendarIcon, 
  MessageSquare,
  Paperclip,
  Send,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ConsultationActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultId: string;
  patientName: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export const ConsultationActionsModal = ({
  isOpen,
  onClose,
  consultId,
  patientName
}: ConsultationActionsModalProps) => {
  const [activeTab, setActiveTab] = useState("notes");
  
  // Add Notes state
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Request Info state
  const [requestedItems, setRequestedItems] = useState<string[]>([]);
  const [clarificationMessage, setClarificationMessage] = useState("");

  // Schedule Follow-up state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  // Conversation thread state
  const [newMessage, setNewMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Dr. Ladan Davallow",
      content: "Thank you for the referral. Based on the patient's growth velocity and current percentiles, I recommend starting with a bone age X-ray and IGF-1 levels.",
      timestamp: new Date(Date.now() - 86400000),
      isCurrentUser: false
    },
    {
      id: "2",
      sender: "You",
      content: "Thank you for the recommendation. Should we also consider thyroid function tests given the family history?",
      timestamp: new Date(Date.now() - 43200000),
      isCurrentUser: true
    }
  ]);

  const nextStepsOptions = [
    { id: "labs", label: "Order additional labs" },
    { id: "imaging", label: "Order imaging studies" },
    { id: "followup", label: "Schedule follow-up visit" },
    { id: "referral", label: "Refer to specialist" },
    { id: "monitoring", label: "Continue monitoring" },
    { id: "education", label: "Patient/family education" }
  ];

  const requestableItems = [
    { id: "labs-a1c", label: "A1c / Glucose Panel" },
    { id: "labs-thyroid", label: "TSH / Free T4" },
    { id: "labs-lipids", label: "Lipid Panel" },
    { id: "labs-igf1", label: "IGF-1 / IGFBP-3" },
    { id: "imaging-bone", label: "Bone Age X-ray" },
    { id: "imaging-us", label: "Ultrasound" },
    { id: "vitals", label: "Updated Vitals (Height/Weight)" },
    { id: "history", label: "Updated Medical History" },
    { id: "growth", label: "Growth Chart Data" }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  const specialists = [
    { id: "davallow", name: "Dr. Ladan Davallow" },
    { id: "specialist2", name: "Dr. Sarah Johnson" },
    { id: "specialist3", name: "Dr. Michael Chen" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSaveNotes = () => {
    toast.success("Clinical notes saved successfully");
    onClose();
  };

  const handleRequestInfo = () => {
    if (requestedItems.length === 0) {
      toast.error("Please select at least one item to request");
      return;
    }
    toast.success("Information request sent to PCP");
    onClose();
  };

  const handleScheduleFollowup = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("Follow-up scheduled successfully");
    onClose();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success("Message sent");
    setNewMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Continue Consultation
          </DialogTitle>
          <DialogDescription>
            Patient: {patientName} | Consult ID: #{consultId.slice(0, 8).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="notes" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1 hidden sm:inline" />
              Add Notes
            </TabsTrigger>
            <TabsTrigger value="request" className="text-xs sm:text-sm">
              <HelpCircle className="h-4 w-4 mr-1 hidden sm:inline" />
              Request Info
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs sm:text-sm">
              <CalendarIcon className="h-4 w-4 mr-1 hidden sm:inline" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="thread" className="text-xs sm:text-sm">
              <MessageSquare className="h-4 w-4 mr-1 hidden sm:inline" />
              Thread
            </TabsTrigger>
          </TabsList>

          {/* Option A - Add Notes */}
          <TabsContent value="notes" className="mt-4 space-y-4">
            <div>
              <Label htmlFor="clinical-notes" className="font-semibold">Clinical Notes</Label>
              <Textarea
                id="clinical-notes"
                placeholder="Enter follow-up notes or comments..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label className="font-semibold">Next Steps / Recommendations</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {nextStepsOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={nextSteps.includes(option.id)}
                      onCheckedChange={(checked) => {
                        setNextSteps(prev => 
                          checked 
                            ? [...prev, option.id]
                            : prev.filter(id => id !== option.id)
                        );
                      }}
                    />
                    <label htmlFor={option.id} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="font-semibold">Attachments (Optional)</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                {attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Paperclip className="h-3 w-3" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handleSaveNotes} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Save Notes
            </Button>
          </TabsContent>

          {/* Option B - Request Additional Information */}
          <TabsContent value="request" className="mt-4 space-y-4">
            <div>
              <Label className="font-semibold">Select Items to Request</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {requestableItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={requestedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        setRequestedItems(prev => 
                          checked 
                            ? [...prev, item.id]
                            : prev.filter(id => id !== item.id)
                        );
                      }}
                    />
                    <label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="clarification" className="font-semibold">Message for PCP (Optional)</Label>
              <Textarea
                id="clarification"
                placeholder="Add any clarification or context for the request..."
                value={clarificationMessage}
                onChange={(e) => setClarificationMessage(e.target.value)}
                className="mt-2 min-h-[80px]"
              />
            </div>

            <Button onClick={handleRequestInfo} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Send Request to PCP
            </Button>
          </TabsContent>

          {/* Option C - Schedule Follow-Up */}
          <TabsContent value="schedule" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="font-semibold">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="font-semibold">Assign Specialist (Optional)</Label>
              <Select value={selectedSpecialist} onValueChange={setSelectedSpecialist}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select specialist" />
                </SelectTrigger>
                <SelectContent>
                  {specialists.map((specialist) => (
                    <SelectItem key={specialist.id} value={specialist.id}>
                      {specialist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleScheduleFollowup} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Schedule Follow-Up
            </Button>
          </TabsContent>

          {/* Option D - Continue Thread */}
          <TabsContent value="thread" className="mt-4 space-y-4">
            <ScrollArea className="h-[250px] border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={cn(
                      "max-w-[85%]",
                      message.isCurrentUser ? "ml-auto bg-accent/10" : "mr-auto bg-muted"
                    )}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(message.timestamp, "MMM d, h:mm a")}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
