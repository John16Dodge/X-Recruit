import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building2, Users, ArrowRight } from 'lucide-react';

const SignupCards = () => {
  const navigate = useNavigate();

  const handleScheduleDemo = () => {
    navigate('/schedule-demo');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Main Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Student Card */}
        <Card className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-white mb-2">For Students</CardTitle>
            <CardDescription className="text-slate-300 text-sm leading-relaxed">
              Discover perfect job matches and accelerate your career growth.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => navigate('/students')}
            >
              Student Sign Up
            </Button>
          </CardFooter>
        </Card>

        {/* College Card */}
        <Card className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-white mb-2">For Colleges</CardTitle>
            <CardDescription className="text-slate-300 text-sm leading-relaxed">
              Enhance your campus placements with AI-powered tools.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => navigate('/colleges')}
            >
              College Sign Up
            </Button>
          </CardFooter>
        </Card>

        {/* Recruiter Card */}
        <Card className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-white mb-2">For Recruiters</CardTitle>
            <CardDescription className="text-slate-300 text-sm leading-relaxed">
              Find the perfect candidates efficiently and reduce hiring time.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => navigate('/recruiters')}
            >
              Recruiter Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Schedule Demo Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleScheduleDemo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          Schedule a Demo
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SignupCards;
