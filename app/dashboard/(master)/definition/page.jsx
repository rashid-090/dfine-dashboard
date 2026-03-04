'use client';
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil, XCircle, PlusCircle, Save, Eraser } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const initialData = [
  { id: 1, name: "ACCOUNTS" },
  { id: 2, name: "Ahlibank" },
  { id: 3, name: "Commercial Bank" },
];

const DefinitionPage = () => {
  const [data, setData] = useState(initialData);
  const [name, setName] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('bank-name');
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Please enter a name");
      return;
    }

    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, name: trimmedName } : item));
      toast.success("Updated");
      setEditingId(null);
    } else {
      setData([{ id: Date.now(), name: trimmedName }, ...data]);
      toast.success("Saved");
    }
    setName('');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    toast.success('Removed');
  };

  return (
    <div className="p-3 md:p-6 w-full space-y-10 bg-background">
      <Toaster position="bottom-right" />
      
      {/* Simple Header */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-foreground">Definitions</h2>
        <hr className="border-border" />
      </div>

      {/* Flat Input Section */}
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">Select title</Label>
          <div className="md:col-span-3">
            <Select value={selectedTitle} onValueChange={setSelectedTitle}>
              <SelectTrigger id="title" className="rounded-none border-input">
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-name">Bank Name</SelectItem>
                <SelectItem value="department">Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">Name</Label>
          <div className="md:col-span-3 relative">
            <Input 
              id="name" 
              placeholder="Enter bank or department name" 
              className="rounded-none border-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            {name && (
              <button onClick={() => {setName(''); setEditingId(null);}} className="absolute right-3 top-2.5 text-muted-foreground">
                <Eraser size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            className={`rounded-none px-8 font-semibold transition-colors ${editingId ? 'bg-muted text-foreground border border-input hover:bg-muted/80' : 'bg-primary text-primary-foreground hover:bg-primary/80'}`}
            onClick={handleSave}
          >
            {editingId ? 'Update Entry' : 'Add Entry'}
          </Button>
        </div>
      </div>

      {/* Simplified List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground">Definition List</h3>
          <span className="text-xs font-mono text-muted-foreground">{data.length} Records</span>
        </div>

        <div className="border border-border">
          <Table>
            <TableHeader className="bg-gray-50 text-black">
              <TableRow>
                <TableHead className="w-[80px] text-center font-bold  uppercase text-[10px]">No.</TableHead>
                <TableHead className="font-bold  uppercase text-[10px]">Name</TableHead>
                <TableHead className="text-right font-bold  uppercase text-[10px] px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-muted/50 border-border transition-colors">
                  <TableCell className="text-center text-sm text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{item.name}</TableCell>
                  <TableCell className="flex justify-end gap-4 py-3 px-6 text-muted-foreground">
                    <button onClick={() => handleEdit(item)} className="hover:text-foreground transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="hover:text-destructive transition-colors">
                      <XCircle size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DefinitionPage;