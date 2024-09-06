'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface Step {
  step: number
  title: string
  description: string
  apiRoutes: string[]
  features: string[]
  components: string[]
  considerations: string[]
  actionableSteps: string[]
}

const projectData: Step[] = [
  {
    step: 1,
    title: "User Authentication",
    description: "Users should be able to register, login, and logout of the application.",
    apiRoutes: ["/api/auth/register", "/api/auth/login", "/api/auth/logout"],
    features: ["User Registration", "User Login", "User Logout"],
    components: ["RegisterForm", "LoginForm", "LogoutButton"],
    considerations: ["Security of user data", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create the RegisterForm, LoginForm, and LogoutButton components",
      "Develop the /api/auth/register, /api/auth/login, and /api/auth/logout API routes",
      "Integrate Firebase Authentication for user management",
      "Test the user registration, login, and logout functionality"
    ]
  },
  {
    step: 2,
    title: "User Profiles",
    description: "Users should be able to view and edit their profile, including their dog's details.",
    apiRoutes: ["/api/profile", "/api/profile/edit"],
    features: ["View Profile", "Edit Profile"],
    components: ["ProfilePage", "EditProfileForm"],
    considerations: ["User authorization", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create the ProfilePage and EditProfileForm components",
      "Develop the /api/profile and /api/profile/edit API routes",
      "Integrate Firebase Firestore for storing user profiles",
      "Test the profile viewing and editing functionality"
    ]
  }
]

export function ProjectPlanner() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(step => step !== stepNumber)
        : [...prev, stepNumber]
    )
    // Automatically collapse the step when it's checked
    setExpandedSteps(prev => prev.filter(step => step !== stepNumber))
  }

  const toggleExpand = (stepNumber: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(step => step !== stepNumber)
        : [...prev, stepNumber]
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Project Planner</h1>
      {projectData.map((step) => (
        <Card key={step.step} className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`step-${step.step}`}
                checked={completedSteps.includes(step.step)}
                onCheckedChange={() => toggleStep(step.step)}
              />
              <CardTitle className="text-xl">
                <label
                  htmlFor={`step-${step.step}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Step {step.step}: {step.title}
                </label>
              </CardTitle>
            </div>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <div className={`relative ${completedSteps.includes(step.step) && !expandedSteps.includes(step.step) ? 'h-20 overflow-hidden' : ''}`}>
            <CardContent className={`space-y-4 ${completedSteps.includes(step.step) && !expandedSteps.includes(step.step) ? 'blur-sm' : ''}`}>
              <div>
                <h3 className="font-semibold mb-2">API Routes:</h3>
                <div className="flex flex-wrap gap-2">
                  {step.apiRoutes.map((route, idx) => (
                    <Badge key={idx} variant="secondary">{route}</Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside">
                  {step.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Components:</h3>
                <div className="flex flex-wrap gap-2">
                  {step.components.map((component, idx) => (
                    <Badge key={idx} variant="outline">{component}</Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Considerations:</h3>
                <ul className="list-disc list-inside">
                  {step.considerations.map((consideration, idx) => (
                    <li key={idx} className="text-orange-600">{consideration}</li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Actionable Steps:</h3>
                <div className="space-y-2">
                  {step.actionableSteps.map((actionableStep, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`step-${step.step}-action-${idx}`} />
                      <label
                        htmlFor={`step-${step.step}-action-${idx}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {actionableStep}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            {completedSteps.includes(step.step) && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-gradient-to-t from-background to-transparent">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(step.step)}
                  className="flex items-center"
                >
                  {expandedSteps.includes(step.step) ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}