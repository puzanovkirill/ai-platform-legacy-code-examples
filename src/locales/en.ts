export default {
  common: {
    SomeError: 'Something went wrong',
    NoData: 'No data',
    ClickToElevateModal: 'Click to show the window on top of the others',
    GoBack: 'Go back',
    CopyPath: 'Copy path',
    Copied: 'Copied',
    AddProccesInformation: 'To add a process, fill in the fields below',
    Name: 'Name',
    Version: 'Version',
    Url: 'URL',
    Next: 'Next',
    ContextMenu: { Feedback: 'Feedback' },
    Button: {
      AddProcces: 'Add process',
      Cancel: 'Cancel',
      Close: 'Close',
      Edit: 'Edit',
      LoadGT: 'Load GT',
      LoadTrace: 'Load Trace',
      Upload: 'Upload',
      Save: 'Save',
      UploadVideo: 'Upload Video',
      Exit: 'Exit',
    },
    Check: 'Retry',
    DeleteProcess: 'Delete a process',
    Manage: 'Manage',
    Processing: 'Processing',
    Search: 'Search',
    Const: {
      FeedbackActions: {
        create: 'create',
        update: 'update',
        delete: 'delete',
        groundTrue: 'groundTrue',
      },
    },
  },
  components: {
    errors: {
      IsRequired: 'This field is required',
      MaxLengthField50: 'This field cannot be longer than 50 characters',
      MaxLengthField100: 'This field cannot be longer than 100 characters',
      MaxLengthField150: 'This field cannot be longer than 150 characters',
      InvalidEmail: 'Please enter a valid email',
      MinLengthPassword: 'Password cannot be shorter than 8 characters',
      NoProcessId: 'No process with such ID',
      InvalidUUID: 'Invalid ID format',
    },
    ProcessesTable: {
      ProcessId: 'Process ID',
      ObjectClass: 'Object class',
      StartFrame: 'Start frame',
      EndFrame: 'End frame',
      Type: 'Type',
      Meta: 'Meta',
      GroundTrue: 'Ground True',
      FrameRange: 'Frame range',
      TimeRange: 'Time range',
      Parent: 'Parent ID',
      ProcessType: {
        Title: 'Process type',
        track: 'Track',
        action: 'Action',
        emotion: 'Emotion',
        attention: 'Attention',
      },
    },
    Error: {
      Connection:
        'Connection error. Data could not be loaded. Please try again later.',
    },
    Success: {
      Connection: 'Conntection successfully.',
    },
    Charts: {
      track: 'Track',
      face: 'Face track',
      body: 'Body track',
    },
  },
  elements: {
    Predict: {
      Confidence: 'Confidence',
      Class: 'Class',
    },
  },
  pages: {
    FileWatcher: {
      ProcessesFeedback: {
        Title: 'Process feedback',
        SendFeedback: 'Send feedback',
        InitialStage: {
          Title: "What's wrong with current process?",
        },
        Class: {
          Title:
            'Wrong process object class (e.g. there is face instead of body)',
          Current: 'Currect process object class is ',
          Choose: 'Choose correct class:',
          New: 'New process object class is ',
        },
        Existence: { Title: 'There should be no process' },
        Predict: {
          Title:
            'Wrong process predict (e.g. there is action sit instead of action lie)',
          Current: 'Current process type is ',
          Choose: 'Choose correct type:',
          New: 'New process type is ',
        },
        Interval: {
          Title: 'Wrong process frame interval',
          Current: `Current process frame internal is from {{from}} to {{to}}`,
          Set: 'Set correct frame interval:',
          From: 'From',
          To: 'to',
        },
      },
      Header: {
        ControlPanel: 'Control Panel',
        NoHandlerTooltip: "You haven't selected any handler yet",
        NoHandler: 'No handler selected',
        FileName: {
          Loading: 'Loading file name',
          Error: 'An error occured while loading file name',
        },
      },
      Processes: {
        Open: 'Open processes',
        Chart: "Process's chart",
        Table: "Process's table",
        Close: 'Close processes',
        RowsCount: 'Rows count',
        FailureCases: 'Failure cases',
      },
      ControlPanel: {
        Title: 'Control Panel',
        VideoInfo: {
          Title: 'Video Info',
          Id: 'Id',
          Name: 'Name',
          Path: 'Path',
          Duration: 'Duration',
          Fps: 'Fps',
          Frames: 'Frames',
        },
        HandlerControl: {
          Title: 'Handler Control',
          Current: 'Current handler',
        },
        MarkupSettings: {
          Title: ' Markup Settings',
          traces: 'Traces',
          gt: 'GT',
          skeleton: 'Skeleton',
        },
        TracesAndGtControl: {
          Title: 'Traces and GT Control',
          LoadTrace: 'Load trace',
          LoadGT: 'Load GT',
          AddProcess: 'Add process',
        },
        ValidationControl: {
          Title: 'Validation Control',
          Validate: 'Validate',
          UploadMetrics: 'Upload metrics',
          UploadingMetrics: 'Metrics uploading',
          JSON: 'JSON',
          Upload: 'Upload',
          Cancel: 'Cancel',
          CreatingValidator: 'Analyzer creating',
          Analyzer: 'Analyzer',
        },
      },
      AIPlayer: {
        StopPlaying: 'Stop',
        StartPlaying: 'Start',
        SeekBackward: 'Seek backward on 1 second',
        SeekForward: 'Seek forward on 1 second',
        MuteSpeaker: 'Mute',
      },
      DoesProcces: 'Does this process contain incorrect information?',
      UpdateInformation: 'Update the information in the fields below',
      TypeProcces: 'Type of process: {{type}}',
      FrameInterval:
        'Frame interval: [{{countStartInterfal}} - {{countEndInterfal}}]',
      ChangeProcces: 'To change or delete a process, select it on the graph.',
      SelectTypeProcess: 'Select type of process',
      VideoNotFound: 'Video not found',
      Gesture: {
        SelectMissingGestur: 'Select the missing gesture',
        SelectTypeGestur: 'Select type of gesture',
      },
      Ground: {
        IsGroundTrue: 'It is ground true?',
        ArleadyExist: 'Ground true already exist',
      },
      Range: {
        ErrorText: 'Start value is great than end value',
        StartFrame: 'Start frame',
        EndFrame: 'End frame',
      },
      Chart: {
        InformationGraph:
          'To visualize the processes on the graph, process the selected file using the handle button or upload a file with markup. You can also start marking up the video using the add process button.',
        Procces: {
          Handler: "Handler's processes",
          Added: 'added process',
          Updated: 'updated process',
          Deleted: 'deleted process',
          Ground: 'GT',
          FN: 'False Negative',
          FP: 'False Positive',
        },
        Titles: {
          GroundTrue: 'Ground true markup',
          GestureType: 'Gesture type',
          FeedbackAction: 'Feedback action',
          CurrentFrameRange: 'Current frame range',
          InitialFrameRange: 'Initial frame range',
        },
      },
    },
    Main: {
      Files: 'Your files',
      Error: 'Error...',
      Loading: 'Loading...',
      HandlerBattery: {
        Request: 'Requesting available handlers...',
      },
      FileItem: {
        LoadingData: 'Your data is loading, please wait',
      },
      Preloader: {
        LoadingVideo: 'Your video is loading...',
      },
    },
    NotSelected: {
      File: {
        Title: 'File not selected',
      },
    },
    Menu: {
      ModalExitMessage: {
        CancelButton: 'Stay in workspace',
        Title: 'Some of your tasks are still in progress',
        Subtitle:
          'If you exit the workspace, all running processes will be canceled.',
      },
    },
    LoginPage: {
      Login: {
        Title: 'Sign In',
        LoginPlaceholder: 'Email',
        PasswordPlaceholder: 'Password',
        Error:
          'Wrong password. Please try again or click "Forgot?" to reset your password.',
        RecoverPassword: 'Forgot Password?',
        LoginButton: 'Sign In',
      },
    },
    Workspaces: {
      Title: 'My  AI Platform',
      Table: {
        Empty: 'No workspaces yet',
        Header: {
          Name: 'Name',
          Plan: 'Plan',
          Persons: 'Profiles',
          Edge: 'Nuitrack Agents',
          Lists: 'Lists',
          Events: 'Persons',
        },
      },
      Status: {
        Active: 'Active',
        Stopped: 'Stopped',
        Expired: 'Expired',
      },
    },
  },
};
