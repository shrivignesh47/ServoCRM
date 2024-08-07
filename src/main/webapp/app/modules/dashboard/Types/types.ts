// src/types.ts

export interface Lead {
    id: string;
    first_name: string;
    last_name: string;
    company: string;
    website: string;
    email: string;
    phone: string;
    lead_status: string;
  }
  
  export interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    company: string;
    email: string;
    phone: string;
  }
  
  export interface Account {
    id: string;
    name: string;
    industry: string;
    website: string;
    phone: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    due_date: string;
  }
  
  export interface Deal {
    id: string;
    name: string;
    amount: number;
    status: string;
  }
  
  export interface Meeting {
    id: string;
    title: string;
    date: string;
    time: string;
  }
  
  export interface Ticket {
    id: string;
    title: string;
    status: string;
    priority: string;
  }
  