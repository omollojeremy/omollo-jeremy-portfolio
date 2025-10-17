"use client";
import React, { useState, useEffect } from 'react';
// Imports necessary for the components and functionality
import { 
  Home, Code, Mail, Instagram, Github, ArrowUp, ChevronRight, Menu, X, 
  Terminal, Server, Atom, Flame, Aperture, GitBranch, Wind, Lightbulb, MessageSquare, 
  Sunrise, Figma, LayoutList, Folder, Link 
} from 'lucide-react';

// Define the FINAL URLs for easy management
const GITHUB_URL = "https://github.com/omollojeremy";
const INSTAGRAM_URL = "https://instagram.com/still.jeremy_"; // Finalized Instagram URL

// Mock Data for the Portfolio Content
const sections = [
  { id: 'hero', name: 'Home', icon: Home },
  { id: 'skills', name: 'Skills', icon: Code },
  { id: 'projects', name: 'Projects', icon: Folder },
];

const skills = [
  // Backend & Languages
  { name: 'Python', level: 'Advanced', icon: Terminal, color: 'text-yellow-500' },
  { name: 'TypeScript & JavaScript', level: 'Expert', icon: Code, color: 'text-yellow-400' },
  { name: 'Node.js', level: 'Advanced', icon: Server, color: 'text-green-500' },
  { name: 'Express.js', level: 'Advanced', icon: GitBranch, color: 'text-gray-400' },
  // Frontend Frameworks
  { name: 'React', level: 'Expert', icon: Atom, color: 'text-sky-400' },
  { name: 'Vue.js', level: 'Intermediate', icon: Flame, color: 'text-emerald-500' },
  { name: 'Angular', level: 'Intermediate', icon: Aperture, color: 'text-red-600' },
  { name: 'Svelte', level: 'Intermediate', icon: Lightbulb, color: 'text-orange-500' },
  // Styling & Build Tools
  { name: 'HTML5 & CSS3', level: 'Expert', icon: LayoutList, color: 'text-orange-600' },
  { name: 'Vite', level: 'Advanced', icon: Wind, color: 'text-purple-400' },
  // Full-Stack & Architecture
  { name: 'Nuxt.js', level: 'Intermediate', icon: Sunrise, color: 'text-green-600' },
  { name: 'GraphQL', level: 'Advanced', icon: MessageSquare, color: 'text-pink-500' },
  // Design
  { name: 'Figma', level: 'Advanced', icon: Figma, color: 'text-fuchsia-500' },
];

// NOTE: I've added a sample project here to demonstrate the component structure.
const projectsData = [
  {
    title: 'Real-Time Chat Application',
    description: 'A full-stack messaging platform supporting instant, persistent, and secure communication between users. Built with scalable web socket infrastructure.',
    githubUrl: 'https://github.com/omollojeremy/chat-app-repo',
    liveUrl: '#', // Placeholder for live URL
    techStack: ['Node.js', 'Express', 'Socket.IO', 'React', 'MongoDB', 'TypeScript'],
  }
]; 


// Helper components for structure and styling
const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-extrabold text-white mb-10 border-b-4 border-sky-500 pb-2 inline-block relative group">
    {children}
  </h2>
);

const IconButton = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="p-3 bg-gray-700 text-sky-400 rounded-full hover:bg-sky-500 hover:text-white transition duration-300 transform hover:scale-110 shadow-lg"
  >
    <Icon size={24} />
  </a>
);

const ProjectCard = ({ project }) => (
  <div className="p-6 bg-gray-800 rounded-xl transition duration-300 hover:shadow-sky-500/30 hover:shadow-2xl border border-gray-700 hover:border-sky-500 transform hover:-translate-y-1 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <Folder size={32} className="text-sky-400" />
      <div className="flex space-x-3">
        {/* GitHub Link */}
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={`GitHub repository for ${project.title}`}
          className="text-gray-400 hover:text-sky-400 transition"
        >
          <Github size={20} />
        </a>
        {/* Live Demo Link (If available) */}
        {project.liveUrl !== '#' && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={`Live demo for ${project.title}`}
            className="text-gray-400 hover:text-sky-400 transition"
          >
            <Link size={20} />
          </a>
        )}
      </div>
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
    <p className="text-gray-400 flex-grow mb-4">{project.description}</p>
    
    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
      {project.techStack.map(tech => (
        <span 
          key={tech} 
          className="text-xs font-medium px-3 py-1 bg-sky-900/50 text-sky-300 rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="py-12 mt-16 border-t border-gray-800 bg-gray-900/50 rounded-t-2xl">
    <div className="flex justify-center space-x-6 mb-6">
      <IconButton Icon={Github} href={GITHUB_URL} label="GitHub" />
      <IconButton Icon={Instagram} href={INSTAGRAM_URL} label="Instagram" />
    </div>
    <p className="text-sm text-center text-gray-500">
      &copy; {new Date().getFullYear()} Omollo Jeremy. All rights reserved.
    </p>
  </footer>
);


// Main Application Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Default active section is 'hero'
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Effect to observe sections for active link highlighting
  useEffect(() => {
    // Check if running in a browser environment before accessing window/document
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach(sec => {
      const element = document.getElementById(sec.id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    // This line ensures the mobile menu closes immediately after any link is clicked,
    // including the "Home" link.
    setIsMenuOpen(false); 
  };

  const NavItem = ({ sectionId, Icon, name }) => (
    <a
      href={`#${sectionId}`}
      onClick={(e) => {
        e.preventDefault();
        handleNavClick(sectionId);
      }}
      className={`
        flex items-center space-x-3 p-3 rounded-xl transition duration-200
        ${activeSection === sectionId 
          ? 'bg-sky-600 text-white shadow-lg' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-sky-400'
        }
      `}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="font-medium">{name}</span>
    </a>
  );

  const MobileNav = () => (
    <div className={`fixed inset-0 z-40 bg-gray-900 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
      <div className="flex justify-end p-4">
        <button onClick={() => setIsMenuOpen(false)} className="text-white p-2 rounded-full bg-sky-600 hover:bg-sky-700">
          <X size={28} />
        </button>
      </div>
      <nav className="p-8 space-y-4">
        {sections.map(section => (
          <NavItem
            key={section.id}
            sectionId={section.id}
            Icon={section.icon}
            name={section.name}
          />
        ))}
        {/* Social Links for Mobile Nav */}
        <div className="pt-8 flex justify-center space-x-6">
          <IconButton Icon={Github} href={GITHUB_URL} label="GitHub" />
          <IconButton Icon={Instagram} href={INSTAGRAM_URL} label="Instagram" />
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      
      {/* Scroll to Top Button */}
      {typeof window !== 'undefined' && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-4 bg-sky-600 text-white rounded-full transition-opacity duration-300 shadow-xl hover:bg-sky-500 ${showScrollToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 right-4 z-50 p-3 bg-sky-600 text-white rounded-full lg:hidden shadow-lg"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Navigation (Conditional Render) */}
      <MobileNav />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto lg:flex">
        
        {/* Fixed Sidebar / Desktop Navigation */}
        <header className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:h-full lg:p-6 bg-gray-800 shadow-2xl">
          <div className="flex flex-col h-full">
            
            {/* Logo/Name */}
            <div className="text-center mb-10 pt-4">
              <h1 className="text-3xl font-extrabold text-sky-400 tracking-wider">
                OMOLLO<span className="text-white"> JEREMY</span>
              </h1>
              <p className="text-sm text-gray-400">Software Engineer</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow space-y-2">
              {sections.map(section => (
                <NavItem
                  key={section.id}
                  sectionId={section.id}
                  Icon={section.icon}
                  name={section.name}
                />
              ))}
            </nav>

            {/* Social Links & Footer */}
            <div className="pt-8 border-t border-gray-700">
              {/* Updated Social Links for Desktop Sidebar */}
              <div className="flex justify-center space-x-4 mb-4">
                <IconButton Icon={Github} href={GITHUB_URL} label="GitHub" />
                <IconButton Icon={Instagram} href={INSTAGRAM_URL} label="Instagram" />
              </div>
              <p className="text-xs text-center text-gray-500">
                &copy; {new Date().getFullYear()} Omollo Jeremy. All rights reserved.
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="lg:ml-72 flex-grow p-4 sm:p-8 lg:p-12">

          {/* 1. Hero Section */}
          <section id="hero" className="min-h-screen flex items-center pt-24 lg:pt-0">
            <div className="max-w-3xl mx-auto lg:mx-0">
              <p className="text-xl text-sky-400 font-semibold mb-3 tracking-widest uppercase">Hi, I'm Omollo Jeremy</p>
              <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-4 leading-tight">
                Full-Stack <br className="hidden sm:block" />
                <span className="text-sky-500">Software Engineer</span>
              </h1>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
                className="inline-flex items-center px-8 py-3 bg-sky-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-sky-500 transition duration-300 transform hover:scale-105"
              >
                View My Work <ChevronRight size={20} className="ml-2" />
              </a>
            </div>
          </section>

          {/* 2. Skills Section */}
          <section id="skills" className="py-20">
            <SectionTitle>Skills & Technologies</SectionTitle>
            {/* Increased grid density since cards are removed */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div 
                    key={index} 
                    // Minimal container, centered, with tooltip for name
                    className="flex justify-center items-center"
                    title={skill.name} // Provides the skill name on hover/touch
                  >
                    <div 
                      className={`p-3 transition duration-300 transform hover:scale-125 hover:bg-gray-800 rounded-full ${skill.color}`}
                    >
                      <IconComponent size={36} /> 
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Projects Section (New) */}
          <section id="projects" className="py-20">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.length === 0 ? (
                <div className="lg:col-span-3 text-center p-12 bg-gray-800 rounded-xl border border-gray-700">
                  <Folder size={48} className="text-sky-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-semibold text-white mb-2">Projects Coming Soon!</h4>
                  <p className="text-gray-400">
                    Check back later to see Omollo Jeremy's featured work. You can add your first project
                    by editing the <code>projectsData</code> array in this file.
                  </p>
                </div>
              ) : (
                projectsData.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))
              )}
            </div>
          </section>
          
          {/* New Footer added to the main content area */}
          <Footer />

        </main>
      </div>
    </div>
  );
};

export default App;
