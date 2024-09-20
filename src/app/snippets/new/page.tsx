'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import createSnippet from '@/actions/createSnippet';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { snippetSchema, SnippetSchemaType } from '@/schemas/snippet';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';

const SnippetCreatePage = () => {
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<SnippetSchemaType>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: '',
      code: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = form;

  // 2. Define a submit handler.
  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const response = await createSnippet(data);
      console.log(response);
      if (response?.error) {
        toast({
          title: 'An error occurred',
          description: response.error,
          variant: 'destructive',
          className: 'tw-bg-red-500 tw-text-white',
        });
      } else {
        // Redirect the user to home page
        redirect('/');
      }
    });
  });

  return (
    <>
      <h1 className='tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl tw-mb-10'>
        Create a snippet
      </h1>
      <Form {...form}>
        <form onSubmit={onSubmit} className='space-y-8'>
          <FormField
            control={control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SnippetCreatePage;
