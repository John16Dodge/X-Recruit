import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useToast } from "@/components/ui/use-toast"
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Step {
  id: number;
  description: string;
}

const RoadmapGenerator = () => {
  const [goal, setGoal] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState('');
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load roadmap from local storage on component mount
    const storedRoadmap = localStorage.getItem('roadmap');
    if (storedRoadmap) {
      const parsedRoadmap = JSON.parse(storedRoadmap);
      setGoal(parsedRoadmap.goal);
      setSteps(parsedRoadmap.steps);
    }
  }, []);

  useEffect(() => {
    // Save roadmap to local storage whenever it changes
    localStorage.setItem('roadmap', JSON.stringify({ goal, steps }));
  }, [goal, steps]);

  const handleGenerateRoadmap = async () => {
    if (!goal) {
      toast({
        title: "Please enter your goal.",
        description: "We need a goal to generate a roadmap for you.",
        variant: "destructive",
      })
      return;
    }

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSteps(data.steps.map((step: string, index: number) => ({ id: index + 1, description: step })));
    } catch (error) {
      console.error("Could not generate roadmap:", error);
      toast({
        title: "Failed to generate roadmap.",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  };

  const handleAddStep = () => {
    if (newStep.trim() === '') {
      toast({
        title: "Please enter a step description.",
        description: "The step description cannot be empty.",
        variant: "destructive",
      })
      return;
    }

    const newStepItem: Step = {
      id: steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1,
      description: newStep,
    };
    setSteps([...steps, newStepItem]);
    setNewStep('');
  };

  const handleDeleteStep = (id: number) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleEditStep = (step: Step) => {
    setEditingStepId(step.id);
    setEditedDescription(step.description);
  };

  const handleUpdateStep = () => {
    if (editedDescription.trim() === '') {
      toast({
        title: "Please enter a step description.",
        description: "The step description cannot be empty.",
        variant: "destructive",
      })
      return;
    }

    setSteps(steps.map(step =>
      step.id === editingStepId ? { ...step, description: editedDescription } : step
    ));
    setEditingStepId(null);
    setEditedDescription('');
  };

  const handleMoveStepUp = (id: number) => {
    const index = steps.findIndex(step => step.id === id);
    if (index > 0) {
      const newSteps = [...steps];
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const handleMoveStepDown = (id: number) => {
    const index = steps.findIndex(step => step.id === id);
    if (index < steps.length - 1) {
      const newSteps = [...steps];
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
      setSteps(newSteps);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Generator</CardTitle>
          <CardDescription>Enter your goal and generate a roadmap to achieve it.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="goal">Your Goal</label>
            <Input
              id="goal"
              placeholder="e.g., Become a full-stack developer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateRoadmap}>Generate Roadmap</Button>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Roadmap Steps</CardTitle>
          <CardDescription>Here are the steps to achieve your goal. You can edit, delete, and reorder them.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-none pl-0">
            {steps.map((step, index) => (
              <li key={step.id} className="mb-2 py-2 border-b border-gray-200 last:border-none">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{index + 1}.</span>
                  {editingStepId === step.id ? (
                    <Input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="flex-grow mx-2"
                    />
                  ) : (
                    <span className="flex-grow mx-2">{step.description}</span>
                  )}
                  <div>
                    {editingStepId === step.id ? (
                      <>
                        <Button size="sm" onClick={handleUpdateStep} className="mr-2">Update</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingStepId(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => handleEditStep(step)} className="mr-2">Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteStep(step.id)}>Delete</Button>
                      </>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => handleMoveStepUp(step.id)} disabled={index === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleMoveStepDown(step.id)} disabled={index === steps.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Add a new step"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleAddStep}>Add Step</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoadmapGenerator;
