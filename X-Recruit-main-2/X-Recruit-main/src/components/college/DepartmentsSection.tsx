import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Department {
  name: string;
  courses: string;
  facultyCount: string;
  studentCapacity: string;
  description: string;
  hod: string;
}

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState<Department[]>([
    { 
      name: '', 
      courses: '', 
      facultyCount: '', 
      studentCapacity: '', 
      description: '',
      hod: ''
    }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handleDepartmentChange = (index: number, field: keyof Department, value: string) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index][field] = value;
    setDepartments(updatedDepartments);
  };

  const addDepartment = () => {
    setDepartments([
      ...departments, 
      { 
        name: '', 
        courses: '', 
        facultyCount: '', 
        studentCapacity: '', 
        description: '',
        hod: ''
      }
    ]);
  };

  const removeDepartment = (index: number) => {
    if (departments.length > 1) {
      setDepartments(departments.filter((_, i) => i !== index));
    } else {
      toast.error('At least one department is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving departments:', departments);
    toast.success('Departments saved successfully!');
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Departments</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEditing ? (
          <div className="space-y-6">
            {departments.map((department, index) => (
              <div key={index} className="p-4 border rounded-lg relative space-y-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeDepartment(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department Name</label>
                    <Input
                      value={department.name}
                      onChange={(e) => handleDepartmentChange(index, 'name', e.target.value)}
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Head of Department</label>
                    <Input
                      value={department.hod}
                      onChange={(e) => handleDepartmentChange(index, 'hod', e.target.value)}
                      placeholder="HOD name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Courses Offered</label>
                  <Input
                    value={department.courses}
                    onChange={(e) => handleDepartmentChange(index, 'courses', e.target.value)}
                    placeholder="e.g., B.Tech, M.Tech, PhD (comma separated)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Faculty Count</label>
                    <Input
                      type="number"
                      value={department.facultyCount}
                      onChange={(e) => handleDepartmentChange(index, 'facultyCount', e.target.value)}
                      placeholder="Number of faculty members"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student Capacity (per year)</label>
                    <Input
                      type="number"
                      value={department.studentCapacity}
                      onChange={(e) => handleDepartmentChange(index, 'studentCapacity', e.target.value)}
                      placeholder="Annual student intake"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Description</label>
                  <Textarea
                    value={department.description}
                    onChange={(e) => handleDepartmentChange(index, 'description', e.target.value)}
                    placeholder="Brief description of the department, specializations, achievements, etc."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addDepartment}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Department
            </Button>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Departments
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {departments.some(dept => dept.name) ? (
              <div className="space-y-4">
                {departments.map((department, index) => (
                  department.name ? (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{department.name}</h3>
                        {department.hod && (
                          <p className="text-sm"><span className="font-medium">HOD:</span> {department.hod}</p>
                        )}
                      </div>
                      
                      {department.courses && (
                        <p className="mt-2"><span className="font-medium">Courses:</span> {department.courses}</p>
                      )}
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {department.facultyCount && (
                          <p><span className="font-medium">Faculty:</span> {department.facultyCount}</p>
                        )}
                        {department.studentCapacity && (
                          <p><span className="font-medium">Annual Intake:</span> {department.studentCapacity} students</p>
                        )}
                      </div>
                      
                      {department.description && (
                        <div className="mt-2">
                          <p className="text-gray-600 dark:text-gray-300">{department.description}</p>
                        </div>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No departments added yet. Click Edit to add departments.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentsSection;