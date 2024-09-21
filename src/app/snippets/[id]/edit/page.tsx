import { getSnippet } from "@/data/snippet-dto";
import { notFound } from "next/navigation";
import SnippetEditForm from "./_components/form";

interface SnippetEditProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage({ params }: SnippetEditProps) {
  const snippet = await getSnippet(params.id);

  if (!snippet) {
    return notFound();
  }

  const { title, code } = snippet;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   // Implement your update logic here
    //   // For example:
    //   // await updateSnippet(snippet.id, { title, code })

    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   router.push(`/snippets/${snippet.id}`);
    //   router.refresh();
    // } catch (error) {
    //   console.error('Failed to update snippet:', error);
    //   // Handle error (e.g., show error message to user)
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return <SnippetEditForm snippet={snippet} />;

  // return (
  //   <div className='tw-container tw-mx-auto tw-py-8'>
  //     <Card className='tw-w-full tw-max-w-2xl tw-mx-auto'>
  //       <form>
  //         <CardHeader>
  //           <CardTitle className='tw-text-2xl tw-font-bold'>
  //             Edit Snippet
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent className='tw-space-y-4'>
  //           <div className='tw-space-y-2'>
  //             <label
  //               htmlFor='title'
  //               className='tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70'
  //             >
  //               Snippet Title
  //             </label>
  //             <Input
  //               id='title'
  //               value={title}
  //               placeholder='Enter snippet title'
  //               required
  //             />
  //           </div>
  //           <div className='tw-space-y-2'>
  //             <label
  //               htmlFor='code'
  //               className='tw-text-sm tw-font-medium tw-leading-none tw-peer-disabled:tw-cursor-not-allowed tw-peer-disabled:tw-opacity-70'
  //             >
  //               Code
  //             </label>
  //             <Textarea
  //               id='code'
  //               value={code}
  //               placeholder='Enter your code here'
  //               className='tw-font-mono'
  //               rows={10}
  //               required
  //             />
  //           </div>
  //         </CardContent>
  //         <CardFooter className='tw-flex tw-justify-between'>
  //           <Button type='button' variant='outline'>
  //             Cancel
  //           </Button>
  //           <Button type='submit'>
  //             {/* {isSubmitting ? 'Saving...' : 'Save Changes'} */}
  //           </Button>
  //         </CardFooter>
  //       </form>
  //     </Card>
  //   </div>
  // );
}
