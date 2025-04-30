import { Request, Response } from 'express';
import { Client } from '../model/client';

export const createClient = async (req: any, res: Response) => {
  try {
    const client = await Client.create({ ...req.body, userId: req.userId });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client' });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

export const updateClient = async (req: any, res: Response) => {
  try {
    const updated = await Client.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client' });
  }
};

export const deleteClient = async (req: any, res: Response) => {
  try {
    await Client.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client' });
  }
};
