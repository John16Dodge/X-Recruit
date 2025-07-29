
import React from 'react';
import { CheckCircle, BarChart4, Users, UserPlus, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <section className="section-padding bg-white relative" id="solutions">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="inline-block px-4 py-2 rounded-full bg-xr-purple/10 text-xr-purple font-medium text-sm mb-6 animate-fade-in">
              Intuitive Dashboards
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animate-delay-100">
              Comprehensive <span className="text-gradient">Analytics & Insights</span> for All Users
            </h2>
            <p className="text-xr-gray text-lg mb-8 animate-fade-in animate-delay-200">
              Our platform provides tailored dashboards for students, colleges, and recruiters,
              offering deep insights and analytics to make data-driven decisions.
            </p>
            
            <div className="space-y-4 mb-8 animate-fade-in animate-delay-300">
              <div className="flex items-start space-x-3">
                <CheckCircle size={22} className="text-xr-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xr-gray-dark">Student Performance Tracking</h3>
                  <p className="text-xr-gray">Monitor skill development and interview performance over time.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle size={22} className="text-xr-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xr-gray-dark">College Placement Analytics</h3>
                  <p className="text-xr-gray">Comprehensive reports on placement rates, company participation, and student outcomes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle size={22} className="text-xr-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-xr-gray-dark">Recruiter Hiring Metrics</h3>
                  <p className="text-xr-gray">Optimize hiring processes with data on candidate sources, interview success, and time-to-hire.</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-xr-blue hover:bg-xr-blue-dark group animate-fade-in animate-delay-400">
              Learn More About Dashboards
              <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Right: Dashboard Preview */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 animate-fade-in">
              <div className="bg-xr-blue-dark text-white p-4">
                <h3 className="font-medium">College Placement Dashboard</h3>
              </div>
              
              <div className="p-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-xr-blue-light/10 flex flex-col items-center justify-center">
                    <div className="text-xr-blue text-2xl font-bold">87%</div>
                    <div className="text-xr-gray-dark text-sm text-center">Placement Rate</div>
                  </div>
                  <div className="p-4 rounded-lg bg-xr-purple-light/10 flex flex-col items-center justify-center">
                    <div className="text-xr-purple text-2xl font-bold">45</div>
                    <div className="text-xr-gray-dark text-sm text-center">Active Recruiters</div>
                  </div>
                  <div className="p-4 rounded-lg bg-xr-teal-light/10 flex flex-col items-center justify-center">
                    <div className="text-xr-teal text-2xl font-bold">650</div>
                    <div className="text-xr-gray-dark text-sm text-center">Total Students</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-100 flex flex-col items-center justify-center">
                    <div className="text-green-600 text-2xl font-bold">210</div>
                    <div className="text-xr-gray-dark text-sm text-center">Interviews</div>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="rounded-lg border border-gray-100 p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-xr-gray-dark">Placement Trends</h4>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-xr-blue"></span>
                      <span className="text-xs text-xr-gray">This Year</span>
                      <span className="w-3 h-3 rounded-full bg-xr-gray ml-2"></span>
                      <span className="text-xs text-xr-gray">Last Year</span>
                    </div>
                  </div>
                  <div className="h-48 w-full relative">
                    {/* Mock Chart - Would be replaced with actual chart component */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                      <div className="w-1/12 h-[60%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[70%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[65%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[80%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[90%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[85%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[95%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[75%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[70%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[85%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[90%] bg-xr-blue mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[80%] bg-xr-blue mx-1 rounded-t-sm"></div>
                    </div>
                    
                    {/* Overlay for Last Year - Gray bars slightly lower */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end opacity-40">
                      <div className="w-1/12 h-[50%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[60%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[55%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[70%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[75%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[70%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[80%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[65%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[60%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[70%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[75%] bg-xr-gray mx-1 rounded-t-sm"></div>
                      <div className="w-1/12 h-[65%] bg-xr-gray mx-1 rounded-t-sm"></div>
                    </div>
                    
                    {/* X-Axis Months */}
                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 transform translate-y-6">
                      <span className="text-xs text-xr-gray">Jan</span>
                      <span className="text-xs text-xr-gray">Feb</span>
                      <span className="text-xs text-xr-gray">Mar</span>
                      <span className="text-xs text-xr-gray">Apr</span>
                      <span className="text-xs text-xr-gray">May</span>
                      <span className="text-xs text-xr-gray">Jun</span>
                      <span className="text-xs text-xr-gray">Jul</span>
                      <span className="text-xs text-xr-gray">Aug</span>
                      <span className="text-xs text-xr-gray">Sep</span>
                      <span className="text-xs text-xr-gray">Oct</span>
                      <span className="text-xs text-xr-gray">Nov</span>
                      <span className="text-xs text-xr-gray">Dec</span>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:border-xr-blue hover:bg-xr-blue-light/5 transition-colors">
                    <BarChart4 size={20} className="text-xr-blue mb-2" />
                    <span className="text-xs text-xr-gray-dark">Reports</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:border-xr-blue hover:bg-xr-blue-light/5 transition-colors">
                    <Users size={20} className="text-xr-blue mb-2" />
                    <span className="text-xs text-xr-gray-dark">Students</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:border-xr-blue hover:bg-xr-blue-light/5 transition-colors">
                    <UserPlus size={20} className="text-xr-blue mb-2" />
                    <span className="text-xs text-xr-gray-dark">Recruiters</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:border-xr-blue hover:bg-xr-blue-light/5 transition-colors">
                    <Calendar size={20} className="text-xr-blue mb-2" />
                    <span className="text-xs text-xr-gray-dark">Events</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
