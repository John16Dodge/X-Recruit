
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CertificationsSection,
  ProjectsSection,
  LanguagesSection,
  VolunteerExperienceSection
} from '../components/profile';

const Students = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow navbar-spacing">
        <section className="py-20">
          <div className="container-custom space-y-6">
            <h1 className="text-4xl font-bold text-center">For Students</h1>
            <div className="space-y-4">
              {/* Personal Information */}
              <PersonalInfoSection />
              {/* Education Section */}
              <EducationSection />
              {/* Experience Section */}
              <ExperienceSection />
              {/* Skills Section */}
              <SkillsSection />
              {/* Certifications Section */}
              <CertificationsSection />
              {/* Projects Section */}
              <ProjectsSection />
              {/* Languages Section */}
              <LanguagesSection />
              {/* Volunteer Experience Section */}
              <VolunteerExperienceSection />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Students;

