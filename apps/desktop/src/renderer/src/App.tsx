import { useState, type FormEvent } from 'react'

type Theme = 'sage' | 'lavender' | 'sky' | 'pink' | 'peach'
type Mode = 'panel' | 'pet'
type Tab = 'chat' | 'tasks' | 'insights' | 'settings'
type Mood = 'neutral' | 'happy' | 'thinking' | 'sleepy' | 'concerned' | 'alert'
type Message = { id: number; role: 'user' | 'lumi'; text: string }
type Task = { id: number; title: string; completed: boolean }

const themes: { id: Theme; name: string; color: string }[] = [
  { id: 'sage', name: 'Sage', color: '#9cafa0' },
  { id: 'lavender', name: 'Lavender', color: '#c5b1ea' },
  { id: 'sky', name: 'Sky Blue', color: '#a3cce6' },
  { id: 'pink', name: 'Blush Pink', color: '#eeb5cd' },
  { id: 'peach', name: 'Soft Peach', color: '#f2bc93' }
]

const moods: Mood[] = ['neutral', 'happy', 'thinking', 'sleepy', 'concerned', 'alert']
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'chat', label: 'Chat', icon: '◌' },
  { id: 'tasks', label: 'Tasks', icon: '☑' },
  { id: 'insights', label: 'Reasoning', icon: '✧' },
  { id: 'settings', label: 'Style', icon: '◈' }
]

function getSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem('lumi-theme')
    if (themes.some((theme) => theme.id === saved)) return saved as Theme
  } catch {
    // Preferences are optional if local storage is disabled.
  }
  return 'sage'
}

function PetAvatar({
  mood,
  onPet,
  compact = false
}: {
  mood: Mood
  onPet: () => void
  compact?: boolean
}): React.JSX.Element {
  const happy = mood === 'happy'
  return (
    <button
      type="button"
      onClick={onPet}
      className={'avatar-button no-drag' + (compact ? ' avatar-compact' : '')}
      aria-label={'Pet LUMI — current expression: ' + mood + '. Click to change expression.'}
      title="Click LUMI to change expression"
    >
      <svg
        className="lumi-character"
        viewBox="0 0 320 348"
        role="img"
        aria-label="LUMI, a friendly rabbit-eared robot"
      >
        <defs>
          <linearGradient id="face-shine" x1="0" y1="0" x2=".9" y2="1">
            <stop stopColor="#343a45" />
            <stop offset="1" stopColor="#202734" />
          </linearGradient>
          <linearGradient id="warm-light" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fffaf0" />
            <stop offset="1" stopColor="var(--glow)" />
          </linearGradient>
        </defs>
        <ellipse cx="158" cy="324" rx="110" ry="14" fill="var(--shadow)" opacity=".45" />
        <path
          d="M83 229 Q157 202 242 229 L260 285 Q162 309 62 282 Z"
          fill="var(--cape)"
          stroke="var(--outline)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="161"
          cy="269"
          rx="73"
          ry="60"
          fill="var(--shell)"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <ellipse
          cx="106"
          cy="301"
          rx="38"
          ry="26"
          fill="var(--shell)"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <ellipse
          cx="217"
          cy="301"
          rx="38"
          ry="26"
          fill="var(--shell)"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <ellipse cx="100" cy="308" rx="25" ry="13" fill="var(--trim)" opacity=".75" />
        <ellipse cx="222" cy="308" rx="25" ry="13" fill="var(--trim)" opacity=".75" />
        <path
          d="M84 111 C51 84 31 35 48 20 C65 6 114 43 120 105 Z"
          fill="var(--trim)"
          stroke="var(--outline)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d="M95 96 C70 70 58 37 66 34 C81 31 101 65 105 96 Z" fill="var(--ear)" />
        <path
          d="M68 37 Q81 54 93 83"
          stroke="url(#warm-light)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M202 104 C211 59 252 13 270 25 C290 39 264 91 239 113 Z"
          fill="var(--trim)"
          stroke="var(--outline)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path d="M218 98 C232 60 251 38 262 39 C266 46 245 82 235 101 Z" fill="var(--ear)" />
        <path
          d="M250 42 Q238 58 229 81"
          stroke="url(#warm-light)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <rect
          x="48"
          y="90"
          width="224"
          height="179"
          rx="74"
          fill="var(--shell)"
          stroke="var(--outline)"
          strokeWidth="7"
        />
        <path
          d="M90 110 Q160 91 234 110"
          fill="none"
          stroke="#fff"
          strokeOpacity=".62"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          cx="51"
          cy="177"
          r="29"
          fill="var(--trim)"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <circle cx="51" cy="177" r="17" fill="none" stroke="var(--glow)" strokeWidth="5" />
        <circle
          cx="269"
          cy="177"
          r="29"
          fill="var(--trim)"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <circle cx="269" cy="177" r="17" fill="none" stroke="var(--glow)" strokeWidth="5" />
        <rect x="77" y="116" width="166" height="119" rx="50" fill="url(#face-shine)" />
        {happy ? (
          <g stroke="var(--face-ink)" strokeWidth="7" fill="none" strokeLinecap="round">
            <path d="M105 171 Q120 149 135 170" />
            <path d="M185 170 Q201 148 216 171" />
            <path d="M144 198 Q160 220 176 198" strokeWidth="6" />
          </g>
        ) : mood === 'sleepy' ? (
          <g stroke="var(--face-ink)" strokeWidth="6" fill="none" strokeLinecap="round">
            <path d="M105 178 Q121 187 136 178" />
            <path d="M184 178 Q200 187 216 178" />
            <path d="M152 205 Q161 210 171 205" strokeWidth="4" />
          </g>
        ) : mood === 'thinking' ? (
          <g fill="var(--face-ink)">
            <rect x="113" y="155" width="11" height="32" rx="6" />
            <circle cx="202" cy="172" r="7" />
            <circle cx="162" cy="205" r="5" />
          </g>
        ) : mood === 'concerned' ? (
          <g stroke="var(--face-ink)" strokeWidth="6" fill="none" strokeLinecap="round">
            <path d="M108 169 L133 178" />
            <path d="M187 178 L211 169" />
            <path d="M149 207 Q161 195 173 207" strokeWidth="4" />
          </g>
        ) : (
          <g fill="var(--face-ink)">
            <rect x="110" y="156" width="12" height="34" rx="6" />
            <rect x="198" y="156" width="12" height="34" rx="6" />
            {mood === 'alert' ? (
              <path
                d="M150 198 Q160 211 170 198"
                stroke="var(--face-ink)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M150 200 Q160 207 170 200"
                stroke="var(--face-ink)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        )}
        <ellipse cx="99" cy="199" rx="13" ry="6" fill="#efb3a3" opacity=".75" />
        <ellipse cx="221" cy="199" rx="13" ry="6" fill="#efb3a3" opacity=".75" />
        <path d="M91 253 Q160 275 231 253 L216 281 Q157 300 104 280 Z" fill="var(--cape)" />
        <path
          d="M160 259 l11 13 -11 13 -11 -13 Z"
          fill="var(--glow)"
          stroke="var(--shell)"
          strokeWidth="2"
        />
      </svg>
    </button>
  )
}

function App(): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(getSavedTheme)
  const [mode, setMode] = useState<Mode>('panel')
  const [mood, setMood] = useState<Mood>('happy')
  const [tab, setTab] = useState<Tab>('chat')
  const [chatInput, setChatInput] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'lumi', text: "Hi! I'm LUMI. Tap me to see my expressions. ✦" }
  ])
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design the desktop companion', completed: false },
    { id: 2, title: 'Build the local task database', completed: false }
  ])

  const changeTheme = (next: Theme): void => {
    setTheme(next)
    try {
      localStorage.setItem('lumi-theme', next)
    } catch {
      /* Optional preference. */
    }
  }

  const cycleTheme = (): void => {
    const index = themes.findIndex((item) => item.id === theme)
    changeTheme(themes[(index + 1) % themes.length].id)
  }

  const changeMode = (next: Mode): void => {
    if (window.api?.setWindowMode) {
      void window.api
        .setWindowMode(next)
        .then(() => setMode(next))
        .catch(() => setMode(next))
    } else {
      setMode(next)
    }
  }

  const petLumi = (): void => {
    const index = moods.indexOf(mood)
    setMood(moods[(index + 1) % moods.length])
  }

  const sendMessage = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const value = chatInput.trim()
    if (!value) return
    const id = Date.now()
    setMessages((current) => [
      ...current,
      { id, role: 'user', text: value },
      {
        id: id + 1,
        role: 'lumi',
        text: 'I heard you! My conversation engine is not connected yet, but you can try my expressions and task list.'
      }
    ])
    setChatInput('')
    setMood('happy')
  }

  const addTask = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const title = taskInput.trim()
    if (!title) return
    setTasks((current) => [...current, { id: Date.now(), title, completed: false }])
    setTaskInput('')
  }

  return (
    <div className={'lumi-app mode-' + mode} data-theme={theme}>
      {mode === 'pet' ? (
        <div className="pet-window">
          <div className="mini-drag">
            <span className="mini-brand">✧ LUMI</span>
            <div className="mini-actions no-drag">
              <button
                type="button"
                className="mini-icon"
                onClick={cycleTheme}
                title="Next colour"
                aria-label="Change colour"
              >
                ◈
              </button>
              <button
                type="button"
                className="mini-icon"
                onClick={() => changeMode('panel')}
                title="Open companion panel"
                aria-label="Open companion panel"
              >
                ↗
              </button>
              <button
                type="button"
                className="mini-icon"
                onClick={() => window.api?.closeWindow()}
                title="Quit LUMI"
                aria-label="Quit LUMI"
              >
                ×
              </button>
            </div>
          </div>
          <div className="mini-stage">
            <PetAvatar mood={mood} onPet={petLumi} compact />
            <span className="sparkle sparkle-left">✦</span>
            <span className="sparkle sparkle-right">✧</span>
          </div>
          <div className="mini-bottom">
            <span>
              {mood === 'happy' ? 'A little hello ♡' : mood.charAt(0).toUpperCase() + mood.slice(1)}
            </span>
            <button
              type="button"
              className="open-panel no-drag"
              onClick={() => changeMode('panel')}
            >
              Open LUMI ↗
            </button>
          </div>
        </div>
      ) : (
        <div className="companion-window">
          <header className="window-header">
            <div className="window-identity drag-handle">
              <span className="brand-symbol">✦</span>
              <span className="window-name">
                LUMI <small>cognitive companion</small>
              </span>
            </div>
            <div className="header-actions no-drag">
              <button type="button" className="header-pill" onClick={() => changeMode('pet')}>
                ✧ &nbsp; Desktop pet
              </button>
              <button
                type="button"
                className="window-control"
                onClick={() => window.api?.minimizeWindow()}
                aria-label="Minimize"
              >
                −
              </button>
              <button
                type="button"
                className="window-control close"
                onClick={() => window.api?.closeWindow()}
                aria-label="Quit LUMI"
              >
                ×
              </button>
            </div>
          </header>

          <div className="companion-body">
            <aside className="companion-side">
              <div className="side-heading">
                <span className="side-small">A LITTLE COMPANY</span>
                <h1>
                  Meet LUMI <span>✧</span>
                </h1>
              </div>
              <div className="side-pet">
                <PetAvatar mood={mood} onPet={petLumi} />
                <span className="side-sparkle side-sparkle-a">✦</span>
                <span className="side-sparkle side-sparkle-b">✧</span>
              </div>
              <p className="side-expression">
                {mood.charAt(0).toUpperCase() + mood.slice(1)}{' '}
                <span>· Click to change expression</span>
              </p>
              <div className="quick-themes">
                <div className="theme-title">Make LUMI yours</div>
                <div className="theme-picks" role="group" aria-label="LUMI colour theme">
                  {themes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      style={{ backgroundColor: item.color }}
                      className={'theme-swatch' + (theme === item.id ? ' selected' : '')}
                      onClick={() => changeTheme(item.id)}
                      title={item.name}
                      aria-label={item.name}
                      aria-pressed={theme === item.id}
                    />
                  ))}
                </div>
                <span className="active-theme">
                  {themes.find((item) => item.id === theme)?.name}
                </span>
              </div>
            </aside>

            <main className="companion-main">
              <nav className="feature-nav" aria-label="LUMI features">
                {tabs.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={'feature-tab' + (tab === item.id ? ' active' : '')}
                    onClick={() => setTab(item.id)}
                    aria-current={tab === item.id ? 'page' : undefined}
                  >
                    <span className="nav-symbol">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="content-area">
                {tab === 'chat' && (
                  <section className="chat-view">
                    <div className="content-heading">
                      <h2>Conversation</h2>
                      <span className="quiet-tag">Offline preview</span>
                    </div>
                    <div className="chat-feed" aria-live="polite">
                      {messages.map((message) => (
                        <div key={message.id} className={'chat-line ' + message.role}>
                          {message.role === 'lumi' && <span className="chat-avatar">✦</span>}
                          <p className="chat-bubble">{message.text}</p>
                        </div>
                      ))}
                    </div>
                    <form className="input-bar" onSubmit={sendMessage}>
                      <input
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        placeholder="Talk to LUMI..."
                        aria-label="Talk to LUMI"
                        maxLength={500}
                      />
                      <button type="submit" aria-label="Send message">
                        ↗
                      </button>
                    </form>
                    <p className="muted-note">Demo conversation · AI will be connected later.</p>
                  </section>
                )}

                {tab === 'tasks' && (
                  <section className="tasks-view">
                    <div className="content-heading">
                      <h2>My tasks</h2>
                      <span className="quiet-tag">
                        {tasks.filter((task) => !task.completed).length} remaining
                      </span>
                    </div>
                    <form className="input-bar" onSubmit={addTask}>
                      <input
                        value={taskInput}
                        onChange={(event) => setTaskInput(event.target.value)}
                        placeholder="What do you need to do?"
                        aria-label="New task"
                        maxLength={120}
                      />
                      <button type="submit" aria-label="Add task">
                        +
                      </button>
                    </form>
                    <div className="task-stack">
                      {tasks.length === 0 && <p className="muted-note">No tasks yet.</p>}
                      {tasks.map((task) => (
                        <div className="task-card" key={task.id}>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>
                              setTasks((current) =>
                                current.map((item) =>
                                  item.id === task.id
                                    ? { ...item, completed: !item.completed }
                                    : item
                                )
                              )
                            }
                            aria-label={'Complete ' + task.title}
                          />
                          <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setTasks((current) => current.filter((item) => item.id !== task.id))
                            }
                            aria-label={'Delete ' + task.title}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="muted-note">
                      These tasks are temporary until SQLite is connected.
                    </p>
                  </section>
                )}

                {tab === 'insights' && (
                  <section className="info-view">
                    <div className="content-heading">
                      <h2>Reasoning</h2>
                      <span className="quiet-tag">Coming next</span>
                    </div>
                    <div className="soft-info">
                      <span className="info-symbol">✧</span>
                      <h3>Why this reminder?</h3>
                      <p>
                        This space will explain LUMI&apos;s task priorities and context-aware suggestions
                        after our Rule-Based Reasoning and Fuzzy Logic are implemented.
                      </p>
                    </div>
                  </section>
                )}

                {tab === 'settings' && (
                  <section className="settings-view">
                    <div className="content-heading">
                      <h2>Appearance & connections</h2>
                    </div>
                    <h3>Colour collection</h3>
                    <div className="palette-list">
                      {themes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={'palette-option' + (theme === item.id ? ' chosen' : '')}
                          onClick={() => changeTheme(item.id)}
                          aria-pressed={theme === item.id}
                        >
                          <span className="palette-dot" style={{ background: item.color }} />
                          <span>{item.name}</span>
                          <span>{theme === item.id ? '✓' : ''}</span>
                        </button>
                      ))}
                    </div>
                    <h3>Connections</h3>
                    <div className="connection-row">
                      <span>SQLite</span>
                      <span>Not connected</span>
                    </div>
                    <div className="connection-row">
                      <span>AI conversation</span>
                      <span>Not connected</span>
                    </div>
                    <div className="connection-row">
                      <span>ESP32 pet</span>
                      <span>Not connected</span>
                    </div>
                    <p className="muted-note">Colour preferences are saved on this computer.</p>
                  </section>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
