import type { FC } from "react";
import { useForm } from "react-hook-form";

type FormValues = { message: string };

export const MessageInput: FC<{ onSend: (msg: string) => void; disabled?: boolean }> = ({
  onSend,
  disabled,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (data.message.trim()) {
      onSend(data.message.trim());
      reset();
    }
  };

  return (
    <form
        className="bg-white border-t border-gray-200 px-4 py-3 flex items-end gap-2"
        onSubmit={handleSubmit(onSubmit)}
        >
        <textarea
            {...register("message")}
            className="flex-1 resize-none rounded-lg border border-border-color px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
            rows={1}
            placeholder="Type a message…"
            disabled={disabled}
            onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
            }
            }}
            style={{ minHeight: 40, maxHeight: 120 }}
        />
        <button
            type="submit"
            className="bg-primary-blue text-white p-2 rounded-full hover:bg-light-blue transition disabled:opacity-50 flex items-center justify-center"
            disabled={disabled}
            aria-label="Send"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </button>
        </form>
  );
};
