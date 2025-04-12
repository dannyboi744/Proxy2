import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { urlSchema } from "@shared/schema";
import { ArrowRightIcon, ShieldIcon } from "@/components/ui/icon";

const formSchema = urlSchema.extend({
  url: z.string().url("Please enter a valid URL including http:// or https://").min(1, "URL is required")
});

interface ProxyFormProps {
  onSubmit: (url: string) => void;
}

export default function ProxyForm({ onSubmit }: ProxyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">Website URL</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      className="flex-grow rounded-l-md border-slate-300 focus:border-primary focus:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <Button 
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span>Browse</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-slate-500">Enter the complete URL including http:// or https://</p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center text-xs">
            <ShieldIcon className="h-4 w-4 text-primary mr-1" />
            <span className="text-slate-600">Your browsing activity is not logged or stored</span>
          </div>
        </form>
      </Form>
    </div>
  );
}
