
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
    name: "Dr. Sarah Johnson",
    role: "AI Research Lead",
    initials: "SJ",
    portfolioLink: "https://www.linkedin.com/in/sarah-johnson"
  },
  {
    name: "Michael Chen",
    role: "Technical Director",
    initials: "MC",
    portfolioLink: "https://www.linkedin.com/in/michael-chen"
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Career Development Specialist",
    initials: "ER",
    portfolioLink: "https://www.linkedin.com/in/emily-rodriguez"
  },
  {
    name: "James Wilson",
    role: "Industry Relations Manager",
    initials: "JW",
    portfolioLink: "https://www.linkedin.com/in/james-wilson"
  },
  {
    name: "Priya Patel",
    role: "Student Success Coordinator",
    initials: "PP",
    portfolioLink: "https://www.linkedin.com/in/priya-patel"
  }
];

const TeamMembers = () => {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-xr-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-xr-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-xr-purple/10 text-xr-purple font-medium text-sm mb-4 animate-fade-in">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animate-delay-100">
            Meet Our <span className="text-gradient">Expert Team</span>
          </h2>
          <p className="text-xr-gray text-lg animate-fade-in animate-delay-200">
            Our dedicated team of professionals is committed to bridging the gap between education and industry.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center p-6">
                      <Avatar className="w-24 h-24 mb-4">
                        {member.image && <AvatarImage src={member.image} alt={member.name} />}
                        <AvatarFallback className="bg-xr-purple/10 text-xr-purple text-xl">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                      <p className="text-xr-gray text-sm mb-2">{member.role}</p>
                      {member.portfolioLink && (
                        <a 
                          href={member.portfolioLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xr-purple hover:text-xr-purple/80 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Portfolio
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TeamMembers;
