import * as React from 'react';

import { CalendarIcon } from '@/components/common/icons/CalendarIcon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type TextFieldBaseProps = {
  helpText?: string;
  error?: boolean;
  description?: boolean;
  containerClassName?: string;
};

type TextFieldVariant = 'input' | 'textarea' | 'date';

type InputTextFieldProps = TextFieldBaseProps &
  Omit<React.ComponentProps<'input'>, 'aria-invalid'> & {
    variant?: 'input';
  };

type TextareaTextFieldProps = TextFieldBaseProps &
  Omit<React.ComponentProps<'textarea'>, 'aria-invalid'> & {
    variant: 'textarea';
  };

type DateTextFieldProps = TextFieldBaseProps &
  Omit<React.ComponentProps<'button'>, 'aria-invalid' | 'children'> & {
    variant: 'date';
    value?: string;
    placeholder?: string;
  };

export type TextFieldProps = InputTextFieldProps | TextareaTextFieldProps | DateTextFieldProps;

export function TextField(props: TextFieldProps) {
  if (props.variant === 'textarea') {
    const {
      variant,
      helpText,
      error = false,
      description = true,
      containerClassName,
      ...textareaProps
    } = props;

    return (
      <TextFieldContainer
        variant={variant}
        helpText={helpText}
        error={error}
        description={description}
        containerClassName={containerClassName}
      >
        <Textarea aria-invalid={error || undefined} {...textareaProps} />
      </TextFieldContainer>
    );
  }

  if (props.variant === 'date') {
    const {
      variant,
      helpText,
      error = false,
      description = true,
      containerClassName,
      value,
      placeholder = '0000년 00월 00일',
      className,
      disabled,
      ...buttonProps
    } = props;

    return (
      <TextFieldContainer
        variant={variant}
        helpText={helpText}
        error={error}
        description={description}
        containerClassName={containerClassName}
      >
        <button
          type="button"
          data-invalid={error || undefined}
          disabled={disabled}
          className={cn(
            'flex h-[54px] w-full cursor-pointer items-center gap-2 rounded-lg border-[1.5px] border-solid border-border-bold bg-background-w px-4 py-4 body-2-regular text-quaternary transition-colors outline-none focus-visible:border-mint-main focus-visible:bg-mint-50/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-background-default data-[invalid=true]:border-red-700 data-[invalid=true]:bg-red-50/40',
            className,
          )}
          {...buttonProps}
        >
          <CalendarIcon className="size-6 shrink-0 text-quaternary" />
          <span className="truncate">{value || placeholder}</span>
        </button>
      </TextFieldContainer>
    );
  }

  const {
    variant = 'input',
    helpText,
    error = false,
    description = true,
    containerClassName,
    ...inputProps
  } = props;

  return (
    <TextFieldContainer
      variant={variant}
      helpText={helpText}
      error={error}
      description={description}
      containerClassName={containerClassName}
    >
      <Input aria-invalid={error || undefined} {...inputProps} />
    </TextFieldContainer>
  );
}

function TextFieldContainer({
  children,
  variant,
  helpText,
  error = false,
  description = true,
  containerClassName,
}: TextFieldBaseProps & {
  children: React.ReactNode;
  variant: TextFieldVariant;
}) {
  const showDescription = description && helpText;

  return (
    <div
      data-slot="text-field"
      data-variant={variant}
      className={cn('flex w-full flex-col items-start gap-1.5', containerClassName)}
    >
      {children}
      {showDescription && (
        <p className={cn('w-full caption-bold', error ? 'text-red-700' : 'text-quaternary')}>
          {helpText}
        </p>
      )}
    </div>
  );
}
