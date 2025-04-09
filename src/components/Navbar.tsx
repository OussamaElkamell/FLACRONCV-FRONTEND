import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, FileUp, LogIn, LogOut, User, UserCog } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { toast } from 'sonner';
import { auth } from '@/services/firebase';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="w-full py-4 border-b border-border bg-background">
      <div className="container-xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FileUp className="h-6 w-6 text-brand-500" />
          <span className="text-xl font-semibold">FLACRONCV</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/resume" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Resume Builder
          </Link>
          <Link to="/cover-letter" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Cover Letter
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline-block">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/resume" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Resume Builder
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cover-letter" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Cover Letter
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <UserCog className="mr-2 h-4 w-4" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
        
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild className="bg-brand-500 hover:bg-brand-600">
                <Link to="/register">
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
