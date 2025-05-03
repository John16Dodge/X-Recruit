
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
    role: "Project Lead",
    initials: "JP",
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

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
