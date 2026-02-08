import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  FileText, 
  Globe, 
  Linkedin, 
  Mail, 
  Phone,
  Award,
  TrendingUp,
  Shield
} from "lucide-react";
import member1 from "../assets/member1.png"; 
import member2 from "../assets/member2.png";
import member3 from "../assets/member3.png";

const team = [
  { 
    name: "Aaditya Jadhav", 
    role: "Co-Founder", 
    title: "Director, Supply Chain Excellence",
    img: member3,
    icon: Globe,
    expertise: ["Supply Chain Management", "Packaging Standards", "Global Distribution"],
    bio: "Aaditya oversees end-to-end operations, ensuring timely delivery and maintaining quality from farm to international markets.",
    linkedin: "#",
    email: "aaditya@avighnatrexim.com"
  },
  { 
    name: "Nikhil Kadam", 
    role: "Co-Founder", 
    title: "Director, Procurement Operations",
    img: member1,
    icon: Package,
    expertise: ["Product Procurement", "Quality Assurance", "Vendor Relations"],
    bio: "With excellent experience in agricultural sourcing, Nikhil ensures we procure only the finest quality products directly from trusted farmers.",
    linkedin: "#",
    email: "nikhil@avighnatrexim.com"
  },
  { 
    name: "Yash Choudhari", 
    role: "Co-Founder", 
    title: "Director, Export Compliance",
    img: member2,
    icon: FileText,
    expertise: ["Export Documentation", "Regulatory Compliance", "Customs Clearance"],
    bio: "Yash's expertise in international trade regulations ensures smooth and compliant operations across all our export destinations.",
    linkedin: "#",
    email: "yash@avighnatrexim.com"
  },
];

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <section
      id="team"
      className="relative py-20 bg-gradient-to-br from-brand-50 via-white to-secondary scroll-mt-28 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600 rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      <div className="container-px mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-brand-600" />
            <span className="text-sm font-philosopher text-brand-600">Leadership Team</span>
          </div>
          <h2 className="mb-4 text-4xl font-poppins font-bold text-brand-600 sm:text-5xl">
            Meet Our Founders
          </h2>
          <p className="text-lg font-philosopher text-gray-600 max-w-2xl mx-auto">
            Three visionaries united by a passion for excellence in global agricultural trade
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-600 to-brand-500"></div>
                  
                  {/* Profile Section */}
                  <div className="p-6 text-center">
                    {/* Profile Image */}
                    <div className="relative inline-block mb-4">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-brand-100 shadow-lg"
                        />
                        {/* Icon Badge */}
                        <div className="absolute -bottom-2 -right-2 p-2 bg-brand-600 rounded-full text-white shadow-lg">
                          <Icon size={20} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Name and Role */}
                    <h3 className="text-xl font-poppins font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    {/* <p className="text-sm font-poppins font-medium text-brand-600 mb-2">
                      {member.role}
                    </p> */}
                    {/* <p className="text-base font-philosopher text-gray-700 mb-4">
                      {member.title}
                    </p> */}

                    {/* Bio */}
                    <p className="text-sm font-philosopher text-gray-600 mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <h4 className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-3">
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-philosopher"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Icons */}
                    {/* <div className="flex justify-center gap-3">
                      <motion.a
                        href={member.linkedin}
                        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin size={18} />
                      </motion.a>
                      <motion.a
                        href={`mailto:${member.email}`}
                        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-brand-600 hover:text-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail size={18} />
                      </motion.a>
                    </div> */}
                  </div>

                  {/* Hover Overlay Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-brand-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team Values Section */}
        <motion.div
          className="bg-brand-600 rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-poppins font-bold mb-2">Collective Experience</h3>
              <p className="font-philosopher text-white/90">
                Excellent combined expertise in international trade
              </p>
            </div>
            <div>
              <Shield className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-poppins font-bold mb-2">Trust & Integrity</h3>
              <p className="font-philosopher text-white/90">
                Building lasting relationships through transparent dealings
              </p>
            </div>
            <div>
              <Globe className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-poppins font-bold mb-2">Global Vision</h3>
              <p className="font-philosopher text-white/90">
                Connecting Indian agriculture to the world market
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}