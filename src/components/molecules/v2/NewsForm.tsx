'use client';
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import TagsDropdown from '@/components/atoms/TagsDropdown';
import CategoriesDropdown from '@/components/atoms/CategoriesDropdown';
import UserDropdown from '@/components/atoms/UserDropdown';

const NewsForm: React.FC = () => {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [headline, setHeadline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [urlToImage, setUrlToImage] = useState<string[]>([]);
  const [sourceName, setSourceName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTagId || !selectedCategoryId || !selectedUserId || !headline || !description || !url || !sourceName) {
      message.error('Please fill all fields');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No authentication token found');

      const response = await fetch('http://localhost:8080/api/article/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          headline,
          description,
          url,
          urlToImage,
          tagId: selectedTagId,
          categoryId: selectedCategoryId,
          userId: selectedUserId,
          sourceName
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit news');
      }

      message.success('News successfully created');
      // Clear form
      setHeadline('');
      setDescription('');
      setUrl('');
      setUrlToImage([]);
      setSourceName('');
      setSelectedTagId(null);
      setSelectedCategoryId(null);
      setSelectedUserId(null);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to submit news');
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 shadow-lg rounded-lg max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Create News Article</h1>

      <div className="mb-4">
        <label htmlFor="sourceName" className="block text-sm font-medium text-white">Source Name</label>
        <Input
          type="text"
          id="sourceName"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <TagsDropdown onChange={(value) => setSelectedTagId(value)} />
      <CategoriesDropdown onChange={(value) => setSelectedCategoryId(value)} />
      <UserDropdown onChange={(value) => setSelectedUserId(value)} />

      <div className="mb-4">
        <label htmlFor="headline" className="block text-sm font-medium text-white">Headline</label>
        <Input
          type="text"
          id="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
        <Input.TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium text-white">URL</label>
        <Input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="urlToImage" className="block text-sm font-medium text-white">Image URLs (comma separated)</label>
        <Input
          type="text"
          id="urlToImage"
          value={urlToImage.join(', ')}
          onChange={(e) => setUrlToImage(e.target.value.split(',').map(s => s.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <Button type="primary" htmlType="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
        Submit News
      </Button>
    </form>
  );
};

export default NewsForm;