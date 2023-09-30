export default {
  common: {
    SomeError: 'Что-то пошло не так',
    NoData: 'Нет данных',
    ClickToElevateModal: 'Нажмите, чтобы показать окно поверх остальных',
    GoBack: 'Вернуться',
    CopyPath: 'Скопировать путь',
    Copied: 'Скопировано',
    AddProccesInformation: 'Чтобы добавить процесс, заполните поля ниже',
    Name: 'Название',
    Version: 'Версия',
    Url: 'URL',
    Next: 'Далее',
    ContextMenu: { Feedback: 'Отзыв' },
    Button: {
      AddProcces: 'Добавить процесс',
      Cancel: 'Отмена',
      Close: 'Закрыть',
      Edit: 'Редактировать',
      LoadGT: 'Загрузить GT',
      LoadTrace: 'Загрузить Trace',
      Upload: 'Загрузить',
      Save: 'Сохранить',
      UploadVideo: 'Загрузить видео',
      Exit: 'Выйти',
    },
    Check: 'Повторить попытку',
    DeleteProcess: 'Удалить процесс',
    Manage: 'Управлять',
    Processing: 'Обработать',
    Search: 'Поиск',
    Const: {
      FeedbackActions: {
        create: 'Добавленный',
        update: 'Обновленный',
        delete: 'Удаленный',
        groundTrue: 'Достоверный процесс',
      },
    },
  },
  components: {
    errors: {
      IsRequired: 'Это поле обязательно для заполнения',
      MaxLengthField50: 'Это поле не может быть длинее 50 символов',
      MaxLengthField100: 'Это поле не может быть длинее 100 символов',
      MaxLengthField150: 'Это поле не может быть длинее 150 символов',
      InvalidEmail: 'Введите корректный email',
      MinLengthPassword: 'Пароль не может быть короче 8 символов',
      NoProcessId: 'Процесса с таким ID нет',
      InvalidUUID: 'Неверный формат ID',
    },
    ProcessesTable: {
      ProcessId: 'ID процесса',
      ObjectClass: 'Класс объекта',
      StartFrame: 'Начальный кадр',
      EndFrame: 'Конечный кадр',
      Type: 'Тип',
      Meta: 'Мета',
      GroundTrue: 'Ground True',
      FrameRange: 'Диапазон кадров',
      TimeRange: 'Временной диапазон',
      Parent: 'Родительский ID',
      ProcessType: {
        Title: 'Тип процесса',
        track: 'Трэк',
        action: 'Действие',
        emotion: 'Эмоция',
        attention: 'Внимание',
      },
    },
    Error: {
      Connection:
        'Ошибка подключения. Не удалось загрузить данные. Повторите попытку позже.',
    },
    Success: {
      Connection: 'Подключение успешно.',
    },
    Charts: {
      track: 'Трек',
      face: 'Трек лица',
      body: 'Трек тела',
    },
  },
  elements: {
    Predict: {
      Confidence: 'Уверенность',
      Class: 'Класс',
    },
  },
  pages: {
    FileWatcher: {
      ProcessesFeedback: {
        Title: 'Отзыв о процессе',
        SendFeedback: 'Отправить отзыв',
        InitialStage: {
          Title: 'Что не так с этим процессом?',
        },
        Class: {
          Title:
            'Неправильный класс объекта процесса (например, face вместо body)',
          Current: 'Класс объекта выбранного процесса - ',
          Choose: 'Выберите правильный класс:',
          New: 'Новый класс объекта процесса - ',
        },
        Existence: { Title: 'Процесса не должно быть' },
        Predict: {
          Title:
            'Неверное определение типа процесса (например, action sit вместо action lie)',
          Current: 'Тип выбранного процесса - ',
          Choose: 'Выберите правильный тип:',
          New: 'Новый тип процесса - ',
        },
        Interval: {
          Title: 'Неправильный интервал',
          Current: `Интервал выбранного процесса - от {{from}} до {{to}}`,
          Set: 'Поставьте правильный интервал:',
          From: 'От',
          To: 'до',
        },
      },
      Header: {
        ControlPanel: 'Панель управления',
        NoHandlerTooltip: 'Вы еще не выбрали ни одного обработчика',
        NoHandler: 'Обработчик не выбран',
        FileName: {
          Loading: 'Загрузка имени файла',
          Error: 'ПРоизошла ошибка при загрузке имени файла',
        },
      },
      Processes: {
        Open: 'Открыть процессы',
        Chart: 'График процессов',
        Table: 'Таблица процессов',
        Close: 'Закрыть процессы',
        RowsCount: 'Кол-во строк',
        FailureCases: 'Ошибки',
      },
      ControlPanel: {
        Title: 'Панель Управления',
        VideoInfo: {
          Title: 'Информация о видео',
          Id: 'Id',
          Name: 'Название',
          Path: 'Путь',
          Duration: 'Длительность',
          Fps: 'Частота кадров',
          Frames: 'Кол-во кадров',
        },
        HandlerControl: {
          Title: 'Управление Обработчиком',
          Current: 'Текущий обработчик',
        },
        MarkupSettings: {
          Title: ' Управление Разметкой',
          traces: 'Трейсы',
          gt: 'GT',
          skeleton: 'Скелет',
        },
        TracesAndGtControl: {
          Title: 'Управление Трейсами и GT',
          LoadTrace: 'Загрузить трейс',
          LoadGT: 'Загрузить GT',
          AddProcess: 'Добавить процесс',
        },
        ValidationControl: {
          Title: 'Управления Валидацией',
          Validate: 'Валидировать',
          UploadMetrics: 'Загрузить метрики',
          UploadingMetrics: 'Загрузка метрик',
          JSON: 'JSON',
          Upload: 'Загрузить',
          Cancel: 'Отмена',
          CreatingValidator: 'Создание анализатора',
          Analyzer: 'Анализатор',
        },
      },
      AIPlayer: {
        StopPlaying: 'Стоп',
        StartPlaying: 'Старт',
        SeekBackward: 'Перемотать на 1 секунду назад',
        SeekForward: 'Перемотать на 1 секунду вперед',
        MuteSpeaker: 'Заглушить',
      },
      DoesProcces: 'Этот процесс содержит неверную информацию?',
      UpdateInformation: 'Обновите информацию в полях ниже',
      TypeProcces: 'Тип процесса: {{type}}',
      FrameInterval:
        'Кадровый интервал: [{{countStartInterfal}} - {{countEndInterfal}}]',
      ChangeProcces:
        'Чтобы изменить или удалить процесс, выберите его на графике.',
      SelectTypeProcess: 'Выберите тип процесса',
      VideoNotFound: 'Видео не найдено',
      PredictSettings: {
        traces: 'Трейсы',
        gt: 'GT',
        skeleton: 'Скелет',
      },
      Gesture: {
        SelectMissingGestur: 'Выберите недостающий жест',
        SelectTypeGestur: 'Выберите тип жеста',
      },
      Ground: {
        IsGroundTrue: 'Это истинная разметка?',
        ArleadyExist: 'Истинная разметка уже существует',
      },
      Range: {
        ErrorText: 'Начальное значение больше конечного',
        StartFrame: 'Начальный кадр',
        EndFrame: 'Последний кадр',
      },
      Chart: {
        InformationGraph:
          'Чтобы показать процессы на графике, обработайте выбранный файл с помощью кнопок обработчиков или загрузите файл с разметкой. Вы также можете начать разметку видео с помощью кнопки обработать',
        Procces: {
          Handler: 'Результат обработчика',
          Added: 'Добавленные',
          Updated: 'Обновленные',
          Deleted: 'Удаленные',
          Ground: 'GT',
          FN: 'False Negative',
          FP: 'False Positive',
        },
        Titles: {
          GroundTrue: 'Истинная разметка',
          GestureType: 'Тип жеста',
          FeedbackAction: 'Ответные действия',
          CurrentFrameRange: 'Текущий диапазон кадров',
          InitialFrameRange: 'Начальный диапазон кадров',
        },
      },
    },
    Main: {
      Files: 'Ваши файлы',
      Error: 'Ошибка...',
      Loading: 'Загрузка...',
      HandlerBattery: {
        Requast: 'Запрос доступных обработчиков...',
      },
      FileItem: {
        LoadingData: 'Ваши данные загружаются, пожалуйста подождите',
      },
      Preloader: {
        LoadingVideo: 'Ваше видео загружается...',
      },
    },
    NotSelected: {
      File: {
        Title: 'Файл не выбран',
      },
    },
    Menu: {
      ModalExitMessage: {
        CancelButton: 'Остаться в рабочем пространстве',
        Title: 'Некоторые из ваших процессов все еще выполняются',
        Subtitle:
          'Если вы выйдете из рабочей области, все запущенные процессы будут отменены.',
      },
    },
    LoginPage: {
      Login: {
        Title: 'Войти',
        LoginPlaceholder: 'Почта',
        PasswordPlaceholder: 'Пароль',
        Error:
          'Некорректный пароль. Пожалуйста, попробуйте снова или кликните по ссылке "Забыли?", чтобы сбросить ваш пароль.',
        RecoverPassword: 'Забыли?',
        LoginButton: 'Войти',
      },
    },
    Workspaces: {
      Title: 'Моя  AI Platform',
      Table: {
        Empty: 'Пока нет рабочего пространства',
        Header: {
          Name: 'Имя',
          Plan: 'План',
          Persons: 'Персоны',
          Edge: 'Nuitrack Agents',
          Lists: 'Списки',
          Events: 'Персоны',
        },
      },
      Status: {
        Active: 'Астивен',
        Stopped: 'Остановлен',
        Expired: 'Истек',
      },
    },
  },
};
