
import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  initials: string;
  portfolioLink?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Magesh Kumar Jayavel",
    role: "Technical Director",
    initials: "MK",
    portfolioLink: "https://john16dodge.github.io/MK-Portfolio/"
  },
  {
    name: "Jayaprakash. S",
    role: "AI Research Lead",
    initials: "JP"
  }
];

const TeamMembers = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-white to-blue-50 dark:from-gray-800/70 dark:to-gray-900/80 relative overflow-hidden" id="team">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-xr-purple/5 dark:bg-xr-purple/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-xr-blue/5 dark:bg-xr-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-xr-teal/5 dark:bg-xr-teal/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.7s' }}></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-purple/10 text-xr-purple font-medium text-sm mb-4 animate-fade-in shine-effect">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animate-delay-100 dark:text-white">
            Meet Our <span className="text-gradient">Expert Team</span>
          </h2>
          <p className="text-xr-gray dark:text-gray-300 text-lg animate-fade-in animate-delay-200">
            Our dedicated team of professionals is committed to bridging the gap between education and industry.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <Carousel 
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col items-center">
                          <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-xr-blue-light/20 to-xr-purple-light/20 dark:from-xr-blue-light/30 dark:to-xr-purple-light/30 p-1 animate-fade-in">
                            <Avatar className="w-full h-full border-4 border-white dark:border-gray-700">
                              {member.image && <AvatarImage src={member.image} alt={member.name} />}
                              <AvatarFallback className="bg-gradient-to-br from-xr-blue to-xr-purple text-white text-3xl font-bold">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-1 dark:text-white animate-fade-in animate-delay-100">{member.name}</h3>
                          <span className="px-4 py-1 rounded-full bg-xr-blue/10 dark:bg-xr-blue/20 text-xr-blue dark:text-xr-blue-light text-sm font-medium mb-4 animate-fade-in animate-delay-200">
                            {member.role}
                          </span>
                          
                          {member.portfolioLink && (
                            <a 
                              href={member.portfolioLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="mt-4 px-5 py-2 rounded-lg border border-xr-purple/30 bg-xr-purple/10 text-xr-purple hover:bg-xr-purple hover:text-white transition-colors flex items-center gap-2 group animate-fade-in animate-delay-300 dark:border-xr-purple-light/40 dark:bg-xr-purple/20 dark:text-xr-purple-light dark:hover:bg-xr-purple dark:hover:text-white"
                            >
                              <span>View Portfolio</span>
                              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </div>
                        
                        <div className="h-1.5 bg-gradient-to-r from-xr-blue via-xr-purple to-xr-teal animate-gradient"></div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-xr-blue text-white hover:bg-xr-blue-dark hover:text-white border-none shadow-md" />
              <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-xr-blue text-white hover:bg-xr-blue-dark hover:text-white border-none shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
