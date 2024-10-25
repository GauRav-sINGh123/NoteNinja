import { Star } from "lucide-react";
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      content: "This AI note-taking tool has completely transformed how I create content. The AI suggestions are incredibly accurate."
    },
    {
      name: "Michael Chen",
      role: "Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      content: "As a student, this tool has been invaluable. It helps me organize my lecture notes and study materials effectively."
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      content: "The collaboration features are fantastic. Our team's productivity has increased significantly since we started using it."
    }
  ];

  return (
    <section id="testimonials" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by thousands</h2>
          <p className="text-gray-400">Here&apos;s what our users have to say</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:scale-105 transition-all ease-in-out cursor-pointer"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}  
                  height={48}  
                  className="rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
