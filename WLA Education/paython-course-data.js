const pythonCourse = {
    id: 1,
    title: "Python Programming",
    description: "Master Python from basics to advanced concepts",
    category: "Programming",
    duration: "30 hours",
    level: "Beginner",
    image: "img/course-python.jpg",
    instructor: {
        name: "Dr. Sarah Johnson",
        bio: "Python expert with 10+ years of experience",
        avatar: "img/instructor-1.jpg"
    },
    sections: [
        {
            title: "Getting Started",
            lessons: [
                {
                    id: 1,
                    title: "Introduction to Python",
                    description: "Learn what Python is and why it's popular",
                    videoId: "abc123",
                    duration: "15 min",
                    resources: [
                        { type: "pdf", title: "Lecture Notes", url: "#" },
                        { type: "code", title: "Setup Instructions", url: "#" }
                    ]
                },
                {
                    id: 2,
                    title: "Setting Up Your Environment",
                    description: "Install Python and set up your development environment",
                    videoId: "def456",
                    duration: "20 min",
                    resources: [
                        { type: "pdf", title: "Installation Guide", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Python Basics",
            lessons: [
                {
                    id: 3,
                    title: "Variables and Data Types",
                    description: "Learn about Python's basic data types",
                    videoId: "ghi789",
                    duration: "25 min",
                    resources: [
                        { type: "code", title: "Practice Exercises", url: "#" }
                    ]
                },
                {
                    id: 4,
                    title: "Operators and Expressions",
                    description: "Understand arithmetic, comparison, and logical operators",
                    videoId: "jkl012",
                    duration: "30 min",
                    resources: [
                        { type: "pdf", title: "Operator Cheat Sheet", url: "#" }
                    ]
                },
                {
                    id: 5,
                    title: "String Operations",
                    description: "Master string manipulation techniques",
                    videoId: "mno345",
                    duration: "35 min",
                    resources: [
                        { type: "code", title: "String Exercises", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Control Flow",
            lessons: [
                {
                    id: 6,
                    title: "Conditional Statements",
                    description: "Learn if, elif, else statements",
                    videoId: "pqr678",
                    duration: "25 min",
                    resources: [
                        { type: "pdf", title: "Conditionals Guide", url: "#" }
                    ]
                },
                {
                    id: 7,
                    title: "Loops - Part 1",
                    description: "Understand while loops and basic iteration",
                    videoId: "stu901",
                    duration: "30 min",
                    resources: [
                        { type: "code", title: "Loop Exercises", url: "#" }
                    ]
                },
                {
                    id: 8,
                    title: "Loops - Part 2",
                    description: "Master for loops and iterating over sequences",
                    videoId: "vwx123",
                    duration: "35 min",
                    resources: [
                        { type: "pdf", title: "Loop Patterns", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Functions",
            lessons: [
                {
                    id: 9,
                    title: "Defining Functions",
                    description: "Learn how to define and call functions",
                    videoId: "yza456",
                    duration: "25 min",
                    resources: [
                        { type: "code", title: "Function Examples", url: "#" }
                    ]
                },
                {
                    id: 10,
                    title: "Function Arguments",
                    description: "Understand positional and keyword arguments",
                    videoId: "bcd789",
                    duration: "30 min",
                    resources: [
                        { type: "pdf", title: "Arguments Reference", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Data Structures",
            lessons: [
                {
                    id: 11,
                    title: "Lists",
                    description: "Learn about lists and list operations",
                    videoId: "efg012",
                    duration: "40 min",
                    resources: [
                        { type: "code", title: "List Exercises", url: "#" }
                    ]
                },
                {
                    id: 12,
                    title: "Dictionaries",
                    description: "Master key-value pairs and dictionary operations",
                    videoId: "hij345",
                    duration: "45 min",
                    resources: [
                        { type: "pdf", title: "Dictionary Methods", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Object-Oriented Programming",
            lessons: [
                {
                    id: 13,
                    title: "Classes and Objects",
                    description: "Learn the fundamentals of classes",
                    videoId: "klm678",
                    duration: "50 min",
                    resources: [
                        { type: "code", title: "Class Examples", url: "#" }
                    ]
                },
                {
                    id: 14,
                    title: "Inheritance",
                    description: "Understand how to create class hierarchies",
                    videoId: "nop901",
                    duration: "55 min",
                    resources: [
                        { type: "pdf", title: "Inheritance Guide", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "File Handling",
            lessons: [
                {
                    id: 15,
                    title: "Reading Files",
                    description: "Learn how to read from text files",
                    videoId: "qrs123",
                    duration: "30 min",
                    resources: [
                        { type: "code", title: "File Examples", url: "#" }
                    ]
                },
                {
                    id: 16,
                    title: "Writing Files",
                    description: "Understand how to write to files",
                    videoId: "tuv456",
                    duration: "35 min",
                    resources: [
                        { type: "pdf", title: "File Modes", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Error Handling",
            lessons: [
                {
                    id: 17,
                    title: "Exceptions Basics",
                    description: "Learn about exceptions and try-except blocks",
                    videoId: "uvw789",
                    duration: "25 min",
                    resources: [
                        { type: "code", title: "Exception Examples", url: "#" }
                    ]
                },
                {
                    id: 18,
                    title: "Custom Exceptions",
                    description: "Create your own exception classes",
                    videoId: "xyz012",
                    duration: "30 min",
                    resources: [
                        { type: "pdf", title: "Exception Hierarchy", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Modules and Packages",
            lessons: [
                {
                    id: 19,
                    title: "Importing Modules",
                    description: "Learn how to import and use Python modules",
                    videoId: "abc456",
                    duration: "35 min",
                    resources: [
                        { type: "code", title: "Module Examples", url: "#" }
                    ]
                },
                {
                    id: 20,
                    title: "Creating Packages",
                    description: "Organize code into packages",
                    videoId: "def789",
                    duration: "40 min",
                    resources: [
                        { type: "pdf", title: "Package Structure", url: "#" }
                    ]
                }
            ]
        },
        {
            title: "Final Project",
            lessons: [
                {
                    id: 21,
                    title: "Project Overview",
                    description: "Introduction to the final project",
                    videoId: "ghi012",
                    duration: "20 min",
                    resources: [
                        { type: "pdf", title: "Project Requirements", url: "#" }
                    ]
                },
                {
                    id: 22,
                    title: "Project Implementation",
                    description: "Build a contact management system",
                    videoId: "jkl345",
                    duration: "60 min",
                    resources: [
                        { type: "code", title: "Starter Code", url: "#" }
                    ]
                }
            ]
        }
    ],
    projects: [
        {
            title: "Number Guessing Game",
            description: "Build a simple number guessing game",
            difficulty: "Beginner"
        },
        {
            title: "To-Do List Application",
            description: "Create a console-based to-do list manager",
            difficulty: "Intermediate"
        },
        {
            title: "Contact Management System",
            description: "Develop a system to store and manage contacts",
            difficulty: "Advanced"
        },
        {
            title: "Weather App",
            description: "Build an application that fetches weather data",
            difficulty: "Intermediate"
        },
        {
            title: "Expense Tracker",
            description: "Create a tool to track personal expenses",
            difficulty: "Advanced"
        }
    ]
};