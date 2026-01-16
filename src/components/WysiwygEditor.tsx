import Editor from 'react-simple-wysiwyg';

interface WysiwygEditorProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

interface WysiwygDisplayProps {
  content: string;
  className?: string;
}

// Shared styles for both editor and display
const wysiwygStyles = `
  .wysiwyg-content h1 { 
    font-size: 2em; 
    font-weight: 700; 
    margin: 1em 0 0.5em; 
  }
  .wysiwyg-content h2 { 
    font-size: 1.5em; 
    font-weight: 700; 
    margin: 0.8em 0 0.4em; 
  }
  .wysiwyg-content h3 { 
    font-size: 1.2em; 
    font-weight: 700; 
    margin: 0.8em 0 0.4em; 
  }
  .wysiwyg-content p { 
    margin: 0.6em 0; 
  }
  .wysiwyg-content ul { 
    margin: 0.6em 0; 
    padding-left: 1.5em; 
    list-style: disc; 
  }
  .wysiwyg-content li { 
    margin: 0.25em 0; 
  }
`;

export const WysiwygEditor = ({
  value,
  onChange,
  placeholder = "Enter text...",
  className = "min-h-[500px] resize-y",
  disabled = false,
  ariaLabel,
}: WysiwygEditorProps) => {
  return (
    <>
      <style>{wysiwygStyles}</style>
      <div className="wysiwyg-content">
        <Editor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          aria-label={ariaLabel}
        />
      </div>
    </>
  );
};

// Read-only display component for showing formatted content
export const WysiwygDisplay = ({
  content,
  className = "",
}: WysiwygDisplayProps) => {
  return (
    <>
      <style>{wysiwygStyles}</style>
      <div 
        className={`wysiwyg-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};
