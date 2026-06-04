import React, { useRef, useState, useEffect } from 'react';
import {
    DocumentEditorContainerComponent,
    Toolbar
} from '@syncfusion/ej2-react-documenteditor';

DocumentEditorContainerComponent.Inject(Toolbar);

function App() {
    const containerRef = useRef(null);
    const [isPrinting, setIsPrinting] = useState(false);

    const editorSettings = {
        showRuler: true,
        allowDragAndDrop: true
    };

    // ✅ SAFE editor getter
    const getEditor = () => containerRef.current?.documentEditor;

    const focusEditor = () => {
        const editor = getEditor();
        if (!editor) return null;
        editor.focusIn();
        return editor;
    };

    // PRINT
    const handlePrint = () => {
        const editor = getEditor();
        if (!editor) return;

        try {
            setIsPrinting(true);
            editor.print();
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => setIsPrinting(false), 1000);
        }
    };

    // CHECKBOX GROUP (REAL WORD FIELDS)
    const insertCheckboxGroup = () => {
        const editor = focusEditor();
        if (!editor) return;

        editor.editor.insertText("🏍️ Select Bikes:\n");

        const items = [
            "Yamaha R15",
            "Honda CB350",
            "Royal Enfield Classic 350",
            "KTM Duke 390",
            "Bajaj Pulsar NS200"
        ];

        items.forEach((item) => {
            editor.editor.insertFormField("CheckBox");
            editor.editor.insertText(" " + item + "\n");
        });
    };

    // DROPDOWN (REAL WORD FIELD)
    const insertDropdown = () => {
        const editor = focusEditor();
        if (!editor) return;

        editor.editor.insertText("🚗 Select Car: ");
        editor.editor.insertFormField("DropDown");

        setTimeout(() => {
            try {
                const names = editor.getFormFieldNames();
                const fieldName = names[names.length - 1];

                const info = editor.getFormFieldInfo(fieldName);

                info.dropdownItems = [
                    "Toyota Camry",
                    "Honda Accord",
                    "Tesla Model 3",
                    "BMW 3 Series",
                    "Mercedes C-Class",
                    "Ford Mustang"
                ];

                editor.setFormFieldInfo(fieldName, info);
            } catch (e) {
                console.error("Dropdown error:", e);
            }
        }, 100);
    };

    // RADIO → replaced with CHECKBOX (Word limitation)
    const insertRadioGroup = () => {
        const editor = focusEditor();
        if (!editor) return;

        editor.editor.insertText("📱 Select Electronics:\n");

        [
            "iPhone 15 Pro",
            "Samsung Galaxy S24",
            "MacBook Pro",
            "Dell XPS 15",
            "Sony WH-1000XM5"
        ].forEach((item) => {
            editor.editor.insertFormField("CheckBox");
            editor.editor.insertText(" " + item + "\n");
        });
    };

    // Styles
    const containerStyles = {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    };

    const sidebarStyles = {
        width: '280px',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        padding: '25px 20px',
        overflowY: 'auto',
        height: '100vh',
        boxSizing: 'border-box',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
    };

    const editorContainerStyles = {
        width: 'calc(100% - 280px)',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box'
    };

    const headerStyles = {
        textAlign: 'center',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e0e0e0'
    };

    const titleStyles = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '5px'
    };

    const subtitleStyles = {
        fontSize: '12px',
        color: '#7f8c8d',
        marginTop: '5px'
    };

    const buttonStyles = {
        width: '100%',
        padding: '12px',
        marginBottom: '12px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const printButtonStyles = {
        ...buttonStyles,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
    };

    const checkboxButtonStyles = {
        ...buttonStyles,
        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        color: 'white'
    };

    const dropdownButtonStyles = {
        ...buttonStyles,
        background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
        color: 'white'
    };

    const radioButtonStyles = {
        ...buttonStyles,
        background: 'linear-gradient(135deg, #FF9800 0%, #FB8C00 100%)',
        color: 'white'
    };

    const infoBoxStyles = {
        marginTop: '25px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '10px',
        borderLeft: '4px solid #2196F3'
    };

    const infoTitleStyles = {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#1976D2',
        marginBottom: '10px'
    };

    const stepStyles = {
        fontSize: '12px',
        color: '#555',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const badgeStyles = {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: '11px',
        lineHeight: '20px',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyles}>

            {/* SIDEBAR */}
            <div style={sidebarStyles}>
                <div style={headerStyles}>
                    <div style={titleStyles}>📋 Form Controls</div>
                    <div style={subtitleStyles}>Insert interactive fields</div>
                </div>

                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        handlePrint();
                    }}
                    style={printButtonStyles}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    🖨️ Print Document
                </button>

                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        insertCheckboxGroup();
                    }}
                    style={checkboxButtonStyles}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    ☑ Insert Checkbox Group
                </button>

                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        insertDropdown();
                    }}
                    style={dropdownButtonStyles}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    ▼ Insert Dropdown
                </button>

                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        insertRadioGroup();
                    }}
                    style={radioButtonStyles}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    ◉ Insert Options (Checkbox)
                </button>

                <div style={infoBoxStyles}>
                    <div style={infoTitleStyles}>📝 How to use:</div>
                    <div style={stepStyles}>
                        <span style={badgeStyles}>1</span>
                        <span>Create a table in the editor</span>
                    </div>
                    <div style={stepStyles}>
                        <span style={badgeStyles}>2</span>
                        <span>Click inside any table cell</span>
                    </div>
                    <div style={stepStyles}>
                        <span style={badgeStyles}>3</span>
                        <span>Click any button above</span>
                    </div>
                    <div style={stepStyles}>
                        <span style={badgeStyles}>4</span>
                        <span>Fields will insert inside the cell</span>
                    </div>
                </div>

                <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ffc107',
                    fontSize: '11px',
                    color: '#856404'
                }}>
                    💡 <strong>Tip:</strong> Checkbox and Dropdown fields are interactive Word form fields that can be checked/selected.
                </div>
            </div>

            {/* EDITOR */}
            <div style={editorContainerStyles}>
                <DocumentEditorContainerComponent
                    id="container"
                    ref={containerRef}
                    height="100vh"
                    serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
                    enableToolbar={true}
                    documentEditorSettings={editorSettings}
                />
            </div>
        </div>
    );
}

export default App;