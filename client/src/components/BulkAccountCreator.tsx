import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { signInAnonymously } from 'firebase/auth';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../configs/firebase.config';

const BulkAccountCreator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [numAccounts, setNumAccounts] = useState(10);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const createAnonymousAccount = async () => {
    try {
      const result = await signInAnonymously(auth);
      const token = await result.user.getIdToken();
      const refreshToken = result.user.refreshToken;

      return {
        uid: result.user.uid,
        accessToken: token,
        refreshToken: refreshToken,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  const generateAccounts = async () => {
    setIsGenerating(true);
    setProgress(0);

    const accounts = [];

    try {
      for (let i = 0; i < numAccounts; i++) {
        const account = await createAnonymousAccount();
        accounts.push(account);
        setProgress(((i + 1) / numAccounts) * 100);

        // Sign out after each account creation to prepare for the next one
        await auth.signOut();
      }

      toast({
        title: 'Success',
        description: `Successfully generated ${numAccounts} anonymous accounts!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate accounts: ' + (error as Error).message,
      });
    } finally {
      // Create and download JSON file
      const jsonData = JSON.stringify(accounts, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `anonymous_accounts_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 animate-custom-bounce">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
                <Users className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate Testing Accounts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Anonymous Accounts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                type="number"
                min="1"
                max="100"
                value={numAccounts}
                onChange={(e) => setNumAccounts(parseInt(e.target.value))}
                placeholder="Number of accounts"
              />
              <Button className="w-full" onClick={generateAccounts} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Accounts'}
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center text-gray-500">
                  Generated: {Math.floor((progress / 100) * numAccounts)}/{numAccounts}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulkAccountCreator;
