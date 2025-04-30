import { Request, Response } from 'express';
import { Client } from '../model/client';
import { Project } from '../model/project';
import { Reminder } from '../model/reminder';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

interface DashboardResponse {
  totalClients: number;
  totalProjects: number;
  remindersDue: number;
  projectsByStatus: Record<string, number>;
}

export const getDashboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    // Validate userId exists
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized - User ID missing' });
      return;
    }

    // Calculate date range for upcoming reminders (next 7 days)
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Execute all queries in parallel with proper user scoping
    const [clientsCount, projects, reminders] = await Promise.all([
      Client.countDocuments({ userId }),
      Project.find({ userId }).populate('clientId', 'name email'), // Only include necessary client fields
      Reminder.find({ 
        userId,
        dueDate: { 
          $gte: now,
          $lte: nextWeek 
        }
      })
    ]);

    // Group projects by status
    const projectsByStatus = projects.reduce((acc, project) => {
      const status = project.status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Prepare response
    const response: DashboardResponse = {
      totalClients: clientsCount,
      totalProjects: projects.length,
      remindersDue: reminders.length, // Already filtered by date in the query
      projectsByStatus
    };

    res.json(response);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};