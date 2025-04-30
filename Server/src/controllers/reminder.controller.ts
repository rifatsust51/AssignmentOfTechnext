import { Request, Response } from 'express';
import { Reminder } from '../model/reminder';

export const createReminder = async (req: any, res: Response) => {
  try {
    const reminder = await Reminder.create({ ...req.body, userId: req.userId });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reminder' });
  }
};

export const getReminders = async (req: any, res: Response) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reminders' });
  }
};

export const updateReminder = async (req: any, res: Response) => {
  try {
    const updated = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reminder' });
  }
};

export const deleteReminder = async (req: any, res: Response) => {
  try {
    await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reminder' });
  }
};
