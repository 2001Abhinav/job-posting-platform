import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Shield, Smartphone } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
}

export default function PaymentModal({ isOpen, onClose, jobId }: PaymentModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/payments/create-order", {
        jobId,
        amount: 100, // 1 INR in paise
      });
      return response.json();
    },
    onSuccess: (data) => {
      initiatePayment(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create payment order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await apiRequest("POST", "/api/payments/verify", paymentData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful!",
        description: "Your job posting is now live and will be visible to candidates.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      onClose();
      // Redirect to dashboard
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support if the payment was deducted.",
        variant: "destructive",
      });
    },
  });

  const initiatePayment = (orderData: any) => {
    setIsProcessing(true);

    // Mock Razorpay integration
    // In a real implementation, you would use the Razorpay SDK
    const mockPaymentId = `pay_${Date.now()}`;
    
    setTimeout(() => {
      // Simulate payment success
      verifyPaymentMutation.mutate({
        paymentId: orderData.paymentId,
        razorpayPaymentId: mockPaymentId,
        razorpayOrderId: orderData.orderId,
      });
      setIsProcessing(false);
    }, 3000);
  };

  const handlePayment = () => {
    createOrderMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            Complete Payment
          </DialogTitle>
          <p className="text-center text-gray-600">Secure payment via Razorpay UPI</p>
        </DialogHeader>

        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Job Posting Fee</span>
                <span className="font-semibold text-gray-900">₹1</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-primary">₹1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={handlePayment} 
            disabled={isProcessing || createOrderMutation.isPending || verifyPaymentMutation.isPending}
            className="w-full py-3 font-semibold"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <Smartphone className="h-4 w-4 mr-2" />
                Pay with UPI
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-3 font-semibold"
          >
            Cancel
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            Secured by Razorpay
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
