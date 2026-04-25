
// --- Grund-Referenzen ---
const pantilogo = document.getElementById("pantilogo");
const wheelMenu = document.getElementById("wheelMenu");
const modeDisplay = document.getElementById("modeDisplay");
const modeSelection = document.getElementById("modeSelection");
const channelsContainer = document.getElementById("channels");
const currentChannelNameEl = document.getElementById("currentChannelName");
const rightSidebar = document.getElementById("rightSidebar");
const activeUsersContainer = document.getElementById("activeUsers");
const userPanelToggle = document.getElementById("userPanelToggle");
const serverUserToggle = document.getElementById("serverUserToggle");
const floatingUserPanel = document.getElementById("floatingUserPanel");

// Zustand
let currentMode = "SERVER";      // SERVER | FREUNDE | GRUPPEN | FAMILIE
let currentEntity = null;        // z.B. "PantiCloud", "Anna", "Familienchat"
let currentChannel = null;       // z.B. "# Allgemein"
let serverSidebarVisible = true; // Mitgliederliste bei Servern ein/aus

// --- Modus → verfügbare Einträge (Server/Freunde/Gruppen/Familie) ---
const dataModes = {
    SERVER: ["PantiCloud", "Gaming"],
    FREUNDE: ["Anna", "Ben"],
    GRUPPEN: ["Familienchat", "Gaming Squad"],
    FAMILIE: ["Frau", "Eltern"]
};

// --- Channels pro Modus + Eintrag ---
const dataChannels = {
    SERVER: {
        "PantiCloud": ["# Allgemein", "# Entwicklung", "# UI"],
        "Gaming": ["# Chat", "# Raids", "# Builds"]
    },
    FREUNDE: {
        "Anna": ["# Allgemein", "# Bilder", "# Urlaub"],
        "Ben": ["# Allgemein", "# Gaming", "# Projekte"]
    },
    GRUPPEN: {
        "Familienchat": ["# Allgemein", "# Fotos"],
        "Gaming Squad": ["# Allgemein", "# Raids"]
    },
    FAMILIE: {
        "Frau": ["# Alltag", "# Termine", "# Kinder"],
        "Eltern": ["# Allgemein", "# Fotos"]
    }
};

// --- Aktive Nutzer pro Modus + Eintrag ---
const dataActiveUsers = {
    SERVER: {
        "PantiCloud": [
            { name: "Anna", status: "online" },
            { name: "Ben", status: "online" },
            { name: "Chris", status: "offline" }
        ],
        "Gaming": [
            { name: "Tom", status: "online" },
            { name: "Lisa", status: "online" }
        ]
    },
    FREUNDE: {
        "Anna": [
            { name: "Anna", status: "online" }
        ],
        "Ben": [
            { name: "Ben", status: "offline" }
        ]
    },
    GRUPPEN: {
        "Familienchat": [
            { name: "Frau", status: "online" },
            { name: "Mama", status: "offline" },
            { name: "Papa", status: "offline" }
        ],
        "Gaming Squad": [
            { name: "Tom", status: "online" },
            { name: "Lisa", status: "online" },
            { name: "Ben", status: "online" }
        ]
    },
    FAMILIE: {
        "Frau": [
            { name: "Frau", status: "online" }
        ],
        "Eltern": [
            { name: "Mama", status: "offline" },
            { name: "Papa", status: "offline" }
        ]
    }
};

// --- Modus setzen ---
function setMode(mode) {
    currentMode = mode;
    modeDisplay.textContent = mode;

    const list = dataModes[currentMode] || [];
    currentEntity = list.length > 0 ? list[0] : null;

    renderModeSelection();
    updateRightSidebarVisibility();
    loadChannels();
    floatingUserPanel.classList.add("hidden");
}

// --- Mode-Auswahl (C4-Tabs) rendern ---
function renderModeSelection() {
    modeSelection.innerHTML = "";
    const list = dataModes[currentMode] || [];

    list.forEach(entity => {
        const span = document.createElement("span");
        span.classList.add("modeItem");
        if (entity === currentEntity) span.classList.add("active");
        span.textContent = entity;
        span.dataset.entity = entity;

        span.addEventListener("click", () => {
            setEntity(entity);
        });

        modeSelection.appendChild(span);
    });
}

// --- Entity wechseln (Server/Freund/Gruppe/Familienmitglied) ---
function setEntity(entity) {
    currentEntity = entity;
    renderModeSelection();
    loadChannels();
    floatingUserPanel.classList.add("hidden");
}

// --- Channels in der Sidebar laden (nur Channels, keine Namen) ---
function loadChannels() {
    channelsContainer.innerHTML = "";

    if (!currentMode || !currentEntity) return;

    const channels = (dataChannels[currentMode] && dataChannels[currentMode][currentEntity]) || [];
    let first = true;

    channels.forEach(chName => {
        const div = document.createElement("div");
        div.classList.add("channel");
        div.textContent = chName;
        div.dataset.channel = chName;

        div.addEventListener("click", () => {
            setActiveChannel(chName);
        });

        channelsContainer.appendChild(div);

        if (first) {
            first = false;
            setActiveChannel(chName);
        }
    });
}

// --- Aktiven Channel setzen ---
function setActiveChannel(channelName) {
    currentChannel = channelName;

    document.querySelectorAll(".channel").forEach(ch => {
        ch.classList.remove("active");
        if (ch.dataset.channel === channelName) {
            ch.classList.add("active");
        }
    });

    currentChannelNameEl.textContent = channelName;
    renderActiveUsers();
}

// --- Rechte Sidebar Sichtbarkeit (Hybrid + Toggle) ---
function updateRightSidebarVisibility() {
    if (currentMode === "SERVER") {
        serverUserToggle.style.display = "block";
        userPanelToggle.style.display = "none";

        if (serverSidebarVisible) {
            rightSidebar.classList.remove("hidden");
        } else {
            rightSidebar.classList.add("hidden");
        }

        floatingUserPanel.classList.add("hidden");
    } else {
        serverUserToggle.style.display = "none";
        rightSidebar.classList.add("hidden");

        userPanelToggle.style.display = "block";
    }
}

// --- Nutzerliste rendern ---
function renderActiveUsers() {
    if (!currentMode || !currentEntity) return;

    const modeUsers = dataActiveUsers[currentMode] || {};
    const users = modeUsers[currentEntity] || [];

    if (currentMode === "SERVER") {
        activeUsersContainer.innerHTML = "";
        users.forEach(u => {
            const div = document.createElement("div");
            div.classList.add("user");
            div.classList.add(u.status === "online" ? "online" : "offline");
            div.textContent = u.name;
            activeUsersContainer.appendChild(div);
        });
    } else {
        if (!floatingUserPanel.classList.contains("hidden")) {
            floatingUserPanel.innerHTML = "";
            const title = document.createElement("h4");
            title.textContent = "Aktive Nutzer";
            floatingUserPanel.appendChild(title);

            users.forEach(u => {
                const div = document.createElement("div");
                div.classList.add("user");
                div.classList.add(u.status === "online" ? "online" : "offline");
                div.textContent = u.name;
                floatingUserPanel.appendChild(div);
            });
        }
    }
}

// --- Wheel-Menü öffnen / positionieren ---
pantilogo.addEventListener("click", (event) => {
    event.stopPropagation();

    const rect = pantilogo.getBoundingClientRect();
    const wheelSize = 160;

    let top = rect.top - wheelSize / 2;
    let left = rect.left - wheelSize / 2;

    if (top < 10) {
        top = rect.bottom + 10;
    }

    if (left < 10) left = 10;
    if (left + wheelSize > window.innerWidth) {
        left = window.innerWidth - wheelSize - 10;
    }
    if (top + wheelSize > window.innerHeight) {
        top = window.innerHeight - wheelSize - 10;
    }

    wheelMenu.style.top = top + "px";
    wheelMenu.style.left = left + "px";

    wheelMenu.classList.toggle("hidden");
});

// --- Wheel-Optionen: Moduswechsel ---
document.querySelectorAll(".wheelOption").forEach(option => {
    option.addEventListener("click", (event) => {
        event.stopPropagation();
        const mode = option.dataset.mode;
        wheelMenu.classList.add("hidden");
        setMode(mode);
    });
});

// --- Floating User Panel Toggle (für Nicht-Server-Modi) ---
userPanelToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentMode === "SERVER") return;

    if (floatingUserPanel.classList.contains("hidden")) {
        floatingUserPanel.classList.remove("hidden");
        renderActiveUsers();
    } else {
        floatingUserPanel.classList.add("hidden");
    }
});

// --- Server-Mitgliederliste Toggle (rechte Sidebar) ---
serverUserToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentMode !== "SERVER") return;

    serverSidebarVisible = !serverSidebarVisible;
    updateRightSidebarVisibility();
});

// --- Globaler Click: Wheel & Floating Panel schließen ---
document.addEventListener("click", (event) => {
    const clickedInsideWheel = wheelMenu.contains(event.target);
    const clickedLogo = pantilogo.contains(event.target);
    const clickedFloatingPanel = floatingUserPanel.contains(event.target);
    const clickedUserToggle = userPanelToggle.contains(event.target);
    const clickedServerToggle = serverUserToggle.contains(event.target);

    if (!clickedInsideWheel && !clickedLogo) {
        wheelMenu.classList.add("hidden");
    }

    if (!clickedFloatingPanel && !clickedUserToggle) {
        floatingUserPanel.classList.add("hidden");
    }
});

// --- Initialer Start ---
setMode("SERVER");

