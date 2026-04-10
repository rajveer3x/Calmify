import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Headphones, FileText, Clock, Tag, ChevronRight } from 'lucide-react';

const ResourceCard = ({ resource }) => {
  const { title, type, duration, category, id, _id } = resource;
  const resourceId = id || _id;

  const getTypeIcon = (resourceType) => {
    switch (resourceType.toLowerCase()) {
      case 'audio': return <Headphones className="w-6 h-6 stroke-[1.5]" />;
      case 'video': return <PlayCircle className="w-6 h-6 stroke-[1.5]" />;
      case 'text': return <FileText className="w-6 h-6 stroke-[1.5]" />;
      default: return <PlayCircle className="w-6 h-6 stroke-[1.5]" />;
    }
  };

  return (
    <Link 
      to={`/play/${resourceId}`}
      className="group relative block w-full text-left bg-serene-lowest rounded-[3rem] p-8 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-5px_rgba(42,52,53,0.08)] cursor-pointer"
    >
      
      {/* Header Ribbon & Icon */}
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-full bg-serene-lower text-primary group-hover:bg-primary-container/20 transition-colors duration-500">
          {getTypeIcon(type)}
        </div>
        <span className="px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-primary border border-outline-variant/20 rounded-full">
          {type}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        <h3 className="text-[1.35rem] font-medium text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors duration-500">
          {title}
        </h3>
        
        <div className="flex items-center gap-5 mt-6 border-t border-outline-variant/10 pt-5">
          <div className="flex items-center gap-2 text-sm text-on-surface/60 font-medium">
            <Clock className="w-4 h-4 stroke-[2]" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface/60 font-medium">
            <Tag className="w-4 h-4 stroke-[2]" />
            <span>{category}</span>
          </div>
        </div>
      </div>

      {/* Hover Action */}
      <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-lg shadow-primary-container/50">
        <ChevronRight strokeWidth={2} className="w-6 h-6" />
      </div>
      
      
    </Link>
  );
};

export default ResourceCard;
