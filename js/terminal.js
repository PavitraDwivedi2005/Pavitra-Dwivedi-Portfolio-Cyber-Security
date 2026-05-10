/**
 * PavitraOS v2.0 - Terminal Portfolio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const container = document.getElementById('terminal-container');
  const guiContainer = document.querySelector('.page-wrapper');
  const modeToggle = document.getElementById('mode-toggle');

  let history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => {
      print(`
Available Commands:

<span class="terminal-accent">whoami</span>          -> About Me
<span class="terminal-accent">skills</span>          -> Technical Skills
<span class="terminal-accent">projects</span>        -> View Projects
<span class="terminal-accent">experience</span>      -> Work Experience
<span class="terminal-accent">resume</span>          -> View Resume
<span class="terminal-accent">cat resume</span>      -> Download Resume
<span class="terminal-accent">blog</span>            -> Read Blogs
<span class="terminal-accent">contact</span>         -> Social Links / Hire Me
<span class="terminal-accent">status</span>          -> Availability Status
<span class="terminal-accent">clear</span>           -> Clear Terminal
<span class="terminal-accent">gui</span>             -> Switch to Modern UI
<span class="terminal-accent">help</span>            -> Show Commands
      `);
    },
    whoami: () => {
      print(`<span class="terminal-header">${DATA.about.title}</span>`);
      print(`<span class="terminal-accent">${DATA.about.subtitle}</span>\n`);
      print(DATA.about.content);
      print(`\n<span class="terminal-dim">Vision:</span> ${DATA.about.vision}`);
    },
    skills: () => {
      print(`<span class="terminal-header">Technical Skills</span>\n`);
      DATA.skills.forEach(cat => {
        print(`<span class="terminal-accent">[${cat.category}]</span>`);
        print(`${cat.items.join(', ')}\n`);
      });
    },
    projects: () => {
      print(`<span class="terminal-header">Projects</span>\n`);
      DATA.projects.forEach(p => {
        print(`[${p.id}] <span class="terminal-accent">${p.title}</span> (${p.tech})`);
      });
      print(`\nType <span class="terminal-accent">open [id]</span> to view details.`);
    },
    experience: () => {
      print(`<span class="terminal-header">Work Experience</span>\n`);
      DATA.experience.forEach(exp => {
        print(`<span class="terminal-accent">${exp.role}</span> @ ${exp.company}`);
        print(`<span class="terminal-dim">${exp.duration}</span>`);
        exp.points.forEach(p => print(`  - ${p}`));
        print('');
      });
    },
    resume: () => {
      print(`<span class="terminal-header">Resume Summary</span>\n`);
      print(DATA.about.subtitle);
      print(`\nType <span class="terminal-accent">cat resume</span> to download the full PDF.`);
    },
    blog: () => {
      print(`<span class="terminal-header">Recent Writings</span>\n`);
      DATA.blog.forEach(b => {
        print(`[${b.id}] <span class="terminal-accent">${b.title}</span>`);
        print(`    <span class="terminal-dim">${b.date} // ${b.readTime}</span>`);
      });
      print(`\nType <span class="terminal-accent">open blog [id]</span> to read.`);
    },
    contact: () => {
      print(`<span class="terminal-header">Initiate Contact</span>\n`);
      print(`Email:    <a href="mailto:${DATA.contact.email}" class="terminal-link">${DATA.contact.email}</a>`);
      print(`LinkedIn: <a href="https://${DATA.contact.linkedin}" target="_blank" class="terminal-link">${DATA.contact.linkedin}</a>`);
      print(`GitHub:   <a href="https://${DATA.contact.github}" target="_blank" class="terminal-link">${DATA.contact.github}</a>`);
      print(`Phone:    ${DATA.contact.phone}`);
    },
    status: () => {
      print(`<span class="terminal-accent">STATUS: ${DATA.status.availability}</span>\n`);
      print(`Available for:`);
      DATA.status.roles.forEach(role => print(`  - ${role}`));
    },
    clear: () => {
      output.innerHTML = '';
    },
    gui: () => {
      toggleGUI();
    },
    neofetch: () => {
      print(`
<span class="terminal-accent">           .---.</span>       <span class="terminal-accent">OS:</span> PavitraOS v2.0
<span class="terminal-accent">          /     \\</span>      <span class="terminal-accent">Kernel:</span> 5.15.0-security
<span class="terminal-accent">          \\     /</span>      <span class="terminal-accent">Uptime:</span> 1337 mins
<span class="terminal-accent">           '---'</span>       <span class="terminal-accent">Shell:</span> pavitra-sh 1.0
<span class="terminal-accent">                       Resolution:</span> 1920x1080
<span class="terminal-accent">                       Terminal:</span> xterm-256color
<span class="terminal-accent">                       CPU:</span> Human Intelligence (1) @ 5.0GHz
<span class="terminal-accent">                       Memory:</span> 64GiB / 128GiB
      `);
    },
    coffee: () => {
      print(`Brewing motivation...`);
      setTimeout(() => print(`<span class="terminal-dim">Error: burnout detected. Please rest.</span>`), 1000);
    },
    sudo: (args) => {
      if (args[0] === 'hire-me') {
        print(`Permission denied. You must be an elite recruiter to execute this command.`);
      } else {
        print(`sudo: ${args[0]}: command not found`);
      }
    }
  };

  const ALIASES = {
    about: 'whoami',
    tech: 'skills',
    work: 'experience',
    cv: 'resume',
    hire: 'contact',
    socials: 'contact',
    open: (args) => {
      if (args[0] === 'blog') {
        const id = parseInt(args[1]);
        const post = DATA.blog.find(b => b.id === id);
        if (post) {
          print(`<span class="terminal-header">${post.title}</span>`);
          print(post.excerpt);
          print(`\n<span class="terminal-dim">Redirecting to full article...</span>`);
          setTimeout(() => window.location.href = `blog.html`, 1500);
        } else print(`Error: Blog ID not found.`);
      } else {
        const id = parseInt(args[0]);
        const project = DATA.projects.find(p => p.id === id);
        if (project) {
          print(`<span class="terminal-header">${project.title}</span>`);
          print(`<span class="terminal-accent">Tech: ${project.tech}</span>\n`);
          print(project.description);
          print(`\nHighlights:`);
          project.highlights.forEach(h => print(`  - ${h}`));
        } else print(`Error: Project ID not found.`);
      }
    },
    cat: (args) => {
      if (args[0] === 'resume') {
        print(`Opening resume.pdf...`);
        window.open('resume.pdf', '_blank');
      } else print(`cat: ${args[0]}: No such file or directory`);
    },
    download: (args) => {
      if (args[0] === 'resume') {
        print(`Downloading resume.pdf...`);
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'Pavitra_Dwivedi_Resume.pdf';
        link.click();
      } else print(`download: ${args[0]}: No such file or directory`);
    }
  };

  function print(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = text;
    output.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }

  function handleCommand(inputVal) {
    const parts = inputVal.trim().toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    if (!cmd) return;

    print(`<span class="prompt">visitor@pavitra:~$</span> ${inputVal}`);
    
    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else if (ALIASES[cmd]) {
      if (typeof ALIASES[cmd] === 'function') {
        ALIASES[cmd](args);
      } else {
        COMMANDS[ALIASES[cmd]](args);
      }
    } else {
      print(`Command not found: ${cmd}. Type 'help' for available commands.`);
      
      // Basic suggestion
      const allCmds = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
      const suggestion = allCmds.find(c => c.startsWith(cmd.substring(0, 3)));
      if (suggestion) {
        print(`<span class="terminal-dim">Did you mean: ${suggestion}?</span>`);
      }
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      handleCommand(val);
      history.push(val);
      historyIndex = history.length;
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.toLowerCase();
      const allCmds = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
      const match = allCmds.find(c => c.startsWith(val));
      if (match) input.value = match;
    }
  });

  // Mode Toggle Logic
  let isTerminal = true;
  function toggleGUI() {
    if (isTerminal) {
      container.style.display = 'none';
      guiContainer.style.display = 'block';
      modeToggle.textContent = '[ CLI Mode ]';
      isTerminal = false;
    } else {
      container.style.display = 'flex';
      guiContainer.style.display = 'none';
      modeToggle.textContent = '[ GUI Mode ]';
      isTerminal = true;
      input.focus();
    }
  }

  modeToggle.addEventListener('click', toggleGUI);

  // Boot Sequence
  async function boot() {
    print(`<span class="boot-line">Initializing PavitraOS v2.0...</span>`);
    await sleep(400);
    print(`<span class="boot-line">Loading system modules... [ OK ]</span>`);
    await sleep(300);
    print(`<span class="boot-line">Establishing secure connection... [ OK ]</span>`);
    await sleep(500);
    print(`<span class="boot-line">Access granted. Terminal ready.</span>\n`);
    await sleep(200);
    print(`Welcome to <span class="terminal-accent">PavitraOS v2.0</span>`);
    print(`Type '<span class="terminal-accent">help</span>' to begin.\n`);
    input.focus();
  }

  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  // Start the show
  guiContainer.style.display = 'none'; // Hide GUI initially
  boot();
});
