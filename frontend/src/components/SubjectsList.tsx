import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Book } from 'lucide-react';
import { Subject } from '../types';
import { getSubjects } from '../utils/localStorage';

const SubjectsList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Subjects</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <Card className="transform transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Book className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
            <p className="text-sm text-gray-500">{subject.code}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectsList;