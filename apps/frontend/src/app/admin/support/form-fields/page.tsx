'use client';

import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { FormFieldEditor } from '@/components/admin/form-field-editor';

export default function TicketFormFieldsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingField, setEditingField] = useState<any>(null);
  const [deleteConfirmField, setDeleteConfirmField] = useState<any>(null);

  // Empty state - will be populated when fields are added
  const [formFields, setFormFields] = useState<any[]>([]);

  const handleNewField = () => {
    setEditingField(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (field: any) => {
    setEditingField(field);
    setIsEditorOpen(true);
  };

  const handleDelete = (field: any) => {
    setDeleteConfirmField(field);
  };

  const handleSaveField = async (data: any) => {
    // Add to state (will be replaced with API call)
    if (editingField) {
      // Update existing
      setFormFields(formFields.map(f => f.id === editingField.id ? { ...editingField, ...data } : f));
    } else {
      // Add new
      const newField = {
        id: Date.now().toString(),
        ...data,
      };
      setFormFields([...formFields, newField]);
    }

    setIsEditorOpen(false);
    setEditingField(null);
  };

  const confirmDelete = () => {
    if (deleteConfirmField) {
      setFormFields(formFields.filter(f => f.id !== deleteConfirmField.id));
      setDeleteConfirmField(null);
    }
  };

  const filteredFields = formFields.filter(field =>
    field.fieldName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Form Fields</h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <a
              href="#"
              className="text-primary hover:underline flex items-center gap-1"
            >
              Click here to see the documentation!
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
        <Button onClick={handleNewField}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Form Fields</CardTitle>
          <CardDescription>
            {filteredFields.length} field{filteredFields.length !== 1 ? 's' : ''} configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No fields found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Width</TableHead>
                  <TableHead>Load After</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">{field.fieldName}</TableCell>
                    <TableCell>
                      {field.isRequired ? (
                        <Badge variant="default" className="bg-red-600">Yes</Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {field.width === 'full' ? 'Full Width' : '1/3 of Row'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {field.loadAfter ? (
                        <Badge variant="secondary">{field.loadAfter}</Badge>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {field.visibilityConditions.length > 0 ? (
                        <Badge variant="default" className="bg-blue-600">
                          {field.visibilityConditions.length} condition{field.visibilityConditions.length !== 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(field)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(field)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Field Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingField ? 'Edit Field' : 'Add New Field'}
            </DialogTitle>
            <DialogDescription>
              Configure how this field appears in the ticket form
            </DialogDescription>
          </DialogHeader>
          <FormFieldEditor
            field={editingField}
            onSave={handleSaveField}
            onCancel={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirmField}
        onOpenChange={(open) => !open && setDeleteConfirmField(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold">{deleteConfirmField?.fieldName}</span> field will be removed from the form.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
