import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EConsultFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  consultId: string;
}

export interface FeedbackData {
  rating: number;
  benefits: string[];
  additionalComments: string;
}

const benefitOptions = [
  { id: "avoid-referral", label: "Avoid a referral" },
  { id: "improve-care", label: "Improve patient care" },
  { id: "learn-new", label: "Learn something new" },
  { id: "assess-diagnose", label: "Assess and diagnose a condition" },
];

const EConsultFeedbackModal = ({
  isOpen,
  onClose,
  onSubmit,
  consultId,
}: EConsultFeedbackModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [additionalComments, setAdditionalComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const toggleBenefit = (benefitId: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefitId)
        ? prev.filter((id) => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData: FeedbackData = {
        rating,
        benefits: selectedBenefits,
        additionalComments,
      };

      await onSubmit(feedbackData);

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! The e-Consult has been marked as complete.",
      });

      // Reset form
      setRating(0);
      setSelectedBenefits([]);
      setAdditionalComments("");
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <Card className="w-full max-w-lg mx-4 bg-card border-border shadow-xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            onClick={onClose}
            aria-label="Close feedback modal"
          >
            <X className="h-5 w-5" />
          </Button>
          <CardTitle id="feedback-modal-title" className="text-xl font-bold text-foreground">
            Review e-Consult
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <label className="font-semibold text-foreground">
              How was your consultation?
            </label>
            <div 
              className="flex gap-1"
              role="group"
              aria-label="Star rating"
            >
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => handleStarClick(starIndex)}
                  onMouseEnter={() => handleStarHover(starIndex)}
                  onMouseLeave={handleStarLeave}
                  onFocus={() => handleStarHover(starIndex)}
                  onBlur={handleStarLeave}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-accent rounded transition-transform hover:scale-110"
                  aria-label={`Rate ${starIndex} out of 5 stars`}
                  aria-pressed={rating >= starIndex}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      starIndex <= displayRating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                You selected {rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Benefits Section */}
          <div className="space-y-3">
            <label className="font-semibold text-foreground">
              This e-Consult helped
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select benefits">
              {benefitOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleBenefit(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                    selectedBenefits.includes(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}
                  aria-pressed={selectedBenefits.includes(option.id)}
                  aria-label={option.label}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div className="space-y-3">
            <label 
              htmlFor="additional-comments" 
              className="font-semibold text-foreground"
            >
              Additional Feedback
            </label>
            <Textarea
              id="additional-comments"
              placeholder="Additional comments or suggestions…"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="min-h-[100px] resize-none"
              aria-describedby="feedback-optional"
            />
            <p id="feedback-optional" className="text-xs text-muted-foreground">
              Optional - Share any additional thoughts about this consultation
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            aria-label="Submit feedback"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EConsultFeedbackModal;
