'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  FileText,
  Link as LinkIcon,
  Upload,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Plus,
} from 'lucide-react';

interface KnowledgeSource {
  id: string;
  type: 'url' | 'pdf' | 'word' | 'text' | 'markdown';
  url?: string;
  filePath?: string;
  originalFilename?: string;
  title: string;
  description?: string;
  keywords: string[];
  chunkCount: number;
  status: 'pending' | 'processing' | 'active' | 'failed' | 'archived';
  processingError?: string;
  useCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  qualityScore: number;
  tags: string[];
  category?: string;
  isEnabled: boolean;
  autoUpdate: boolean;
  updateFrequency?: number;
  lastProcessedAt?: string;
  nextCheckAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function KnowledgeSourcesPage() {
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addType, setAddType] = useState<'url' | 'file'>('url');
  const [activeTab, setActiveTab] = useState('all');

  // Add URL form
  const [urlForm, setUrlForm] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
    tags: '',
    autoUpdate: false,
    updateFrequency: 24,
  });

  // Add File form
  const [fileForm, setFileForm] = useState({
    file: null as File | null,
    title: '',
    description: '',
    category: '',
    tags: '',
  });

  useEffect(() => {
    fetchSources();
  }, [activeTab]);

  const fetchSources = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.append('status', activeTab);

      const response = await fetch(`/api/ai-knowledge-sources?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch sources');
      const data = await response.json();
      setSources(data.sources);
    } catch (error) {
      console.error('Error fetching sources:', error);
      toast.error('Failed to load knowledge sources');
    } finally {
      setLoading(false);
    }
  };

  const addUrlSource = async () => {
    try {
      const response = await fetch('/api/ai-knowledge-sources/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          ...urlForm,
          tags: urlForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error('Failed to add URL source');
      toast.success('URL source added successfully. Processing in background...');
      setAddDialogOpen(false);
      setUrlForm({
        url: '',
        title: '',
        description: '',
        category: '',
        tags: '',
        autoUpdate: false,
        updateFrequency: 24,
      });
      fetchSources();
    } catch (error) {
      console.error('Error adding URL source:', error);
      toast.error('Failed to add URL source');
    }
  };

  const addFileSource = async () => {
    if (!fileForm.file) {
      toast.error('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', fileForm.file);
      formData.append('title', fileForm.title || fileForm.file.name);
      if (fileForm.description) formData.append('description', fileForm.description);
      if (fileForm.category) formData.append('category', fileForm.category);
      if (fileForm.tags) {
        const tagsArray = fileForm.tags.split(',').map((t) => t.trim()).filter(Boolean);
        formData.append('tags', JSON.stringify(tagsArray));
      }

      const response = await fetch('/api/ai-knowledge-sources/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');
      toast.success('File uploaded successfully. Processing in background...');
      setAddDialogOpen(false);
      setFileForm({
        file: null,
        title: '',
        description: '',
        category: '',
        tags: '',
      });
      fetchSources();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  const reprocessSource = async (id: string) => {
    try {
      const response = await fetch(`/api/ai-knowledge-sources/${id}/reprocess`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to reprocess source');
      toast.success('Source reprocessing started');
      fetchSources();
    } catch (error) {
      console.error('Error reprocessing source:', error);
      toast.error('Failed to reprocess source');
    }
  };

  const deleteSource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this knowledge source?')) return;

    try {
      const response = await fetch(`/api/ai-knowledge-sources/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete source');
      toast.success('Knowledge source deleted');
      fetchSources();
    } catch (error) {
      console.error('Error deleting source:', error);
      toast.error('Failed to delete source');
    }
  };

  const toggleEnabled = async (id: string, isEnabled: boolean) => {
    try {
      const response = await fetch(`/api/ai-knowledge-sources/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ isEnabled }),
      });

      if (!response.ok) throw new Error('Failed to update source');
      toast.success(isEnabled ? 'Source enabled' : 'Source disabled');
      fetchSources();
    } catch (error) {
      console.error('Error updating source:', error);
      toast.error('Failed to update source');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="secondary">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            Archived
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url':
        return <LinkIcon className="w-4 h-4" />;
      case 'pdf':
      case 'word':
      case 'text':
      case 'markdown':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Knowledge Sources</h1>
          <p className="text-muted-foreground">
            Manage external documents and URLs that AI uses for learning
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Source
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sources.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sources.filter((s) => s.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {sources.filter((s) => s.status === 'processing').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Chunks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sources.reduce((sum, s) => sum + s.chunkCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Sources</CardTitle>
          <CardDescription>
            External documents and URLs for AI knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : sources.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No knowledge sources found. Click "Add Source" to create one.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Chunks</TableHead>
                      <TableHead className="text-center">Usage</TableHead>
                      <TableHead className="text-center">Quality</TableHead>
                      <TableHead className="text-center">Enabled</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(source.type)}
                            <span className="text-xs uppercase">{source.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="font-medium line-clamp-1">{source.title}</div>
                          {source.description && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {source.description}
                            </div>
                          )}
                          {source.url && (
                            <div className="text-xs text-blue-600 line-clamp-1 mt-1">
                              {source.url}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(source.status)}</TableCell>
                        <TableCell className="text-center">{source.chunkCount}</TableCell>
                        <TableCell className="text-center">{source.useCount}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-sm font-medium">
                              {source.qualityScore.toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={source.isEnabled}
                            onCheckedChange={(checked) =>
                              toggleEnabled(source.id, checked)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedSource(source);
                                setViewDialogOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {(source.status === 'failed' || source.status === 'active') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => reprocessSource(source.id)}
                              >
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSource(source.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Source Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Knowledge Source</DialogTitle>
            <DialogDescription>
              Add a new URL or document to the AI knowledge base
            </DialogDescription>
          </DialogHeader>

          <Tabs value={addType} onValueChange={(v) => setAddType(v as 'url' | 'file')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <LinkIcon className="w-4 h-4 mr-2" />
                URL
              </TabsTrigger>
              <TabsTrigger value="file">
                <Upload className="w-4 h-4 mr-2" />
                File Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/documentation"
                  value={urlForm.url}
                  onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="url-title">Title *</Label>
                <Input
                  id="url-title"
                  placeholder="Source title"
                  value={urlForm.title}
                  onChange={(e) => setUrlForm({ ...urlForm, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="url-description">Description</Label>
                <Textarea
                  id="url-description"
                  placeholder="Brief description of this source"
                  value={urlForm.description}
                  onChange={(e) =>
                    setUrlForm({ ...urlForm, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="url-category">Category</Label>
                  <Input
                    id="url-category"
                    placeholder="e.g., Documentation"
                    value={urlForm.category}
                    onChange={(e) =>
                      setUrlForm({ ...urlForm, category: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="url-tags">Tags (comma-separated)</Label>
                  <Input
                    id="url-tags"
                    placeholder="technical, api, guide"
                    value={urlForm.tags}
                    onChange={(e) => setUrlForm({ ...urlForm, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <Label htmlFor="auto-update">Auto Update</Label>
                  <p className="text-sm text-muted-foreground">
                    Periodically check for content changes
                  </p>
                </div>
                <Switch
                  id="auto-update"
                  checked={urlForm.autoUpdate}
                  onCheckedChange={(checked) =>
                    setUrlForm({ ...urlForm, autoUpdate: checked })
                  }
                />
              </div>

              {urlForm.autoUpdate && (
                <div>
                  <Label htmlFor="update-frequency">Update Frequency (hours)</Label>
                  <Input
                    id="update-frequency"
                    type="number"
                    min="1"
                    value={urlForm.updateFrequency}
                    onChange={(e) =>
                      setUrlForm({
                        ...urlForm,
                        updateFrequency: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="file" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="file">File * (PDF, Word, Text, Markdown)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={(e) =>
                    setFileForm({ ...fileForm, file: e.target.files?.[0] || null })
                  }
                />
              </div>

              <div>
                <Label htmlFor="file-title">Title</Label>
                <Input
                  id="file-title"
                  placeholder="Leave empty to use filename"
                  value={fileForm.title}
                  onChange={(e) => setFileForm({ ...fileForm, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="file-description">Description</Label>
                <Textarea
                  id="file-description"
                  placeholder="Brief description of this document"
                  value={fileForm.description}
                  onChange={(e) =>
                    setFileForm({ ...fileForm, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="file-category">Category</Label>
                  <Input
                    id="file-category"
                    placeholder="e.g., Documentation"
                    value={fileForm.category}
                    onChange={(e) =>
                      setFileForm({ ...fileForm, category: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="file-tags">Tags (comma-separated)</Label>
                  <Input
                    id="file-tags"
                    placeholder="technical, api, guide"
                    value={fileForm.tags}
                    onChange={(e) => setFileForm({ ...fileForm, tags: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addType === 'url' ? addUrlSource : addFileSource}>
              Add Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Source Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Knowledge Source Details</DialogTitle>
            <DialogDescription>Full source information and statistics</DialogDescription>
          </DialogHeader>
          {selectedSource && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <div className="mt-1 p-2 bg-muted rounded">{selectedSource.title}</div>
                </div>

                <div>
                  <Label>Type</Label>
                  <div className="mt-1 p-2 bg-muted rounded uppercase">
                    {selectedSource.type}
                  </div>
                </div>
              </div>

              {selectedSource.description && (
                <div>
                  <Label>Description</Label>
                  <div className="mt-1 p-2 bg-muted rounded">
                    {selectedSource.description}
                  </div>
                </div>
              )}

              {selectedSource.url && (
                <div>
                  <Label>URL</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-blue-600 break-all">
                    <a href={selectedSource.url} target="_blank" rel="noopener noreferrer">
                      {selectedSource.url}
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedSource.status)}</div>
                </div>

                <div>
                  <Label>Chunks</Label>
                  <div className="mt-1">{selectedSource.chunkCount}</div>
                </div>

                <div>
                  <Label>Quality Score</Label>
                  <div className="mt-1">{selectedSource.qualityScore.toFixed(1)}%</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Usage Count</Label>
                  <div className="mt-1">{selectedSource.useCount} times</div>
                </div>

                <div>
                  <Label>Helpful</Label>
                  <div className="mt-1 flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    {selectedSource.helpfulCount}
                  </div>
                </div>

                <div>
                  <Label>Not Helpful</Label>
                  <div className="mt-1 flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4 text-red-600" />
                    {selectedSource.notHelpfulCount}
                  </div>
                </div>
              </div>

              {selectedSource.keywords.length > 0 && (
                <div>
                  <Label>Keywords</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedSource.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedSource.tags.length > 0 && (
                <div>
                  <Label>Tags</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedSource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedSource.processingError && (
                <div>
                  <Label className="text-red-600">Error</Label>
                  <div className="mt-1 p-2 bg-red-50 text-red-900 rounded border border-red-200">
                    {selectedSource.processingError}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
