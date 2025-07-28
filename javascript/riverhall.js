// Helper to convert itemType string (e.g., 'widowDust') to PascalCase (e.g., 'WidowDust')
const toPascalCase = (str) => {
    return str.replace(/(?:^|-)([a-z])/g, (x, y) => y.toUpperCase());
};

// Helper to format item type for display (e.g., 'widowLumber' to 'Widow Lumber')
const formatItemNameForDisplay = (itemType) => {
    // Check if the itemType exists in the 'items' object to get its proper name
    if (items[itemType] && items[itemType].name) {
        return items[itemType].name;
    }
    // Fallback for axes or other types not in 'items' or furniture
    const furnitureItem = furnitureItems.find(f => f.id === itemType);
    if (furnitureItem) return furnitureItem.name;

    return itemType.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

// Item definitions and their base sell rates
const items = {
    // Widow Lumber now gives cash directly upon chopping, not through selling
    widowLumber: { name: "Widow Lumber", baseSellRate: 10, imageUrl: 'riverhall/widow-lumber.png' }, 
    widowDust: { name: "Widow Dust", baseSellRate: 10, imageUrl: 'riverhall/items/widow-dust.png' }, 
    widowStones: { name: "Widow Stones", baseSellRate: 15, imageUrl: 'riverhall/items/widow-stones.png' },
    widowPelt: { name: "Widow Pelt", baseSellRate: 20, imageUrl: 'riverhall/items/widow-pelt.png' }
};

// Axe definitions with efficiency (higher means faster chopping) and boughtPrice
const axes = [
    { name: "Basic Axe", cost: { amount: 0, currency: 'widowCash' }, boughtPrice: 0, imageUrl: "riverhall/axes/basic-axe.png", efficiency: 1 }, // Basic axe is free
    { name: "Stone Axe", cost: { amount: 50, currency: 'widowCash' }, boughtPrice: 50, imageUrl: "riverhall/axes/stone-axe.png", efficiency: 1.5 }, // 50% faster
    { name: "Iron Axe", cost: { amount: 150, currency: 'widowCash' }, boughtPrice: 150, imageUrl: "riverhall/axes/iron-axe.png", efficiency: 2.5 }, // 150% faster
    { name: "Batx Axe", cost: { amount: 50, currency: 'widowStones' }, boughtPrice: 500, imageUrl: "riverhall/axes/bat-axe.png", efficiency: 4 } // Diamond Axe now costs Widow Stones
];

// Furniture definitions - UPDATED to make all stretchable and include new block types
const furnitureItems = [
    { id: 'SnowGround', name: 'Snow Ground', cost: { amount: 20, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/snow-floor.png', stretchable: true, category: 'decor' }, // Changed category to 'decor'
    { id: 'LilyPond', name: 'Lily Pond', cost: { amount: 1200, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/lily-pond.png', stretchable: true, category: 'outdoor' }, // Changed category to 'decor'
    { id: 'RedTable', name: 'Red Table', cost: { amount: 200, currency: 'widowCash' }, imageUrl: 'assets/furniture/demonic-table.png', stretchable: true, widthBlocks: 2, heightBlocks: 1, category: 'decor' }, // Changed category to 'decor'
    // New Furniture Items
    { id: 'water', name: 'Water', cost: { amount: 500, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/water.png', stretchable: true, category: 'outdoor' }, // New category: 'outdoor'
    { id: 'stonewall', name: 'Stone Wall', cost: { amount: 300, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/stone-wall.png', stretchable: true, widthBlocks: 1, heightBlocks: 3, category: 'walls' }, // Made stretchable, New category: 'walls'
    { id: 'chair', name: 'Chair', cost: { amount: 150, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/chair.png', stretchable: true, widthBlocks: 3, heightBlocks: 2, category: 'decor' },
    { id: 'bed', name: 'Bed', cost: { amount: 700, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/bed.png', stretchable: true, widthBlocks: 3, heightBlocks: 2, category: 'decor' }, // Made stretchable
    { id: 'plant', name: 'Plant', cost: { amount: 80, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/plant.png', stretchable: true, widthBlocks: 1, heightBlocks: 2, category: 'decor' }, // Made stretchable
    { id: 'chest', name: 'Chest', cost: { amount: 400, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/chest.png', stretchable: true, widthBlocks: 2, heightBlocks: 2, category: 'decor' }, // Made stretchable
    { id: 'fountain', name: 'Fountain', cost: { amount: 1200, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/fountain.png', stretchable: true, widthBlocks: 3, heightBlocks: 3, category: 'outdoor' }, // New outdoor item
    { id: 'bench', name: 'Bench', cost: { amount: 250, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/bench.png', stretchable: true, widthBlocks: 3, heightBlocks: 1, category: 'outdoor' }, // New outdoor item
    // 10 new furniture items
    { id: 'woodenWall', name: 'Wooden Wall', cost: { amount: 100, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/wood-wall.png', stretchable: true, widthBlocks: 1, heightBlocks: 3, category: 'walls' },
    { id: 'brickWall', name: 'Brick Wall', cost: { amount: 180, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/brick-wall.png', stretchable: true, widthBlocks: 1, heightBlocks: 3, category: 'walls' },
    { id: 'StarWallpaper', name: 'Star Wallpaper', cost: { amount: 2999, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/star-wallpaper.png', stretchable: true, widthBlocks: 1, heightBlocks: 3, category: 'walls' },
    { id: 'fancyLamp', name: 'Coming Soon', cost: { amount: 9999999, currency: 'widowCash' }, imageUrl: 'https://placehold.co/30x60/FFD700/000000?text=Lamp', stretchable: true, widthBlocks: 1, heightBlocks: 2, category: 'decor' },
    { id: 'rug', name: 'Coming Soon', cost: { amount: 999999, currency: 'widowCash' }, imageUrl: 'https://placehold.co/90x60/800080/FFFFFF?text=Rug', stretchable: true, widthBlocks: 3, heightBlocks: 2, category: 'decor' },
    { id: 'fireplace', name: 'Coming Soon', cost: { amount: 999999, currency: 'widowCash' }, imageUrl: 'https://placehold.co/90x90/5A5A5A/FFFFFF?text=Fireplace', stretchable: true, widthBlocks: 3, heightBlocks: 3, category: 'decor' },
    { id: 'gardenGnome', name: 'Garden Gnome', cost: { amount: 130, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/garden-nome.png', stretchable: true, widthBlocks: 1, heightBlocks: 2, category: 'outdoor' },
    { id: 'birdBath', cost: { amount: 180, currency: 'widowCash' }, imageUrl: 'riverhall/furniture/bird-bath.png', stretchable: true, widthBlocks: 2, heightBlocks: 2, category: 'outdoor' },
    { id: 'patioSet', name: 'Coming Soon', cost: { amount: 9999999, currency: 'widowCash' }, imageUrl: 'https://placehold.co/120x90/696969/FFFFFF?text=Patio', stretchable: true, widthBlocks: 4, heightBlocks: 3, category: 'outdoor' },
    { id: 'bookcase', name: 'Coming Soon', cost: { amount: 9999999, currency: 'widowCash' }, imageUrl: 'https://placehold.co/60x90/D2B48C/000000?text=Books', stretchable: true, widthBlocks: 2, heightBlocks: 3, category: 'decor' }
];

// Define possible quests - UPDATED for lumber requirement and "Start Quest" button
const availableQuests = [
    {
        id: 'chopLumber1',
        type: 'chop',
        targetItem: 'widowLumber',
        quantity: 10,
        description: 'Chop 10 Widow Lumber.',
        rewards: { widowCash: 50, widowDust: 2 }
    },
    {
        id: 'collectDust1',
        type: 'collect',
        targetItem: 'widowDust',
        quantity: 5,
        description: 'Collect 5 Widow Dust.',
        rewards: { widowCash: 30, widowStones: 1 }
    },
    {
        id: 'collectStones1',
        type: 'collect',
        targetItem: 'widowStones',
        quantity: 3,
        description: 'Collect 3 Widow Stones.',
        rewards: { widowCash: 70, widowPelt: 1 }
    },
    {
        id: 'chopLumber2',
        type: 'chop',
        targetItem: 'widowLumber',
        quantity: 20,
        description: 'Chop 20 Widow Lumber.',
        rewards: { widowCash: 100, widowDust: 5, widowStones: 2 }
    },
    {
        id: 'chopLumber3',
        type: 'chop',
        targetItem: 'widowLumber',
        quantity: 50,
        description: 'Chop 50 Widow Lumber.',
        rewards: { widowCash: 250, widowDust: 10, widowStones: 5, widowPelt: 2 }
    }
];

// House building variables - Moved to top for proper initialization
const HOUSE_GRID_ROWS = 30; // Increased size
const HOUSE_GRID_COLS = 40; // Increased size
const BLOCK_SIZE = 30; // Pixels per block

// Define block images and their costs - ADDED stretchable property
const blockTypes = {
    'wall': { name: 'Wall Block', imageUrl: 'riverhall/furniture/stone-wall.png', cost: 0, stretchable: true },
    'grass': { name: 'Grass Block', imageUrl: 'riverhall/furniture/grass.png', cost: 0, stretchable: true }
};

// Object to store preloaded block images
const preloadedBlockImages = {};
const preloadedFurnitureImages = {};

// Preload block images to prevent disappearing issue
const preloadBlockImages = () => {
    for (const type in blockTypes) {
        const img = new Image();
        img.src = blockTypes[type].imageUrl;
        img.onload = () => {
            preloadedBlockImages[type] = img;
            console.log(`Preloaded ${blockTypes[type].name} image.`);
        };
        img.onerror = () => console.error(`Failed to preload ${blockTypes[type].name} image: ${blockTypes[type].imageUrl}`);
    }
    // Preload furniture images as well
    furnitureItems.forEach(item => {
        const img = new Image();
        img.src = item.imageUrl;
        img.onload = () => {
            preloadedFurnitureImages[item.id] = img;
            console.log(`Preloaded ${item.name} image.`);
        };
        img.onerror = () => console.error(`Failed to preload ${item.name} image: ${item.imageUrl}`);
    });
};


// Ensure all DOM content is loaded before trying to access elements
document.addEventListener('DOMContentLoaded', () => {
    // UI elements
    const loadingScreen = document.getElementById('loadingScreen');
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const mainGameContainer = document.getElementById('mainGameContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const hoverSound = document.getElementById('hoverSound'); // Get hover sound element
    const clickSound = document.getElementById('clickSound'); // Get click sound element
    const questCompletedModal = document.getElementById('questCompletedModal');
    const questRewardsList = document.getElementById('questRewardsList');

    // Function to play sound effects
    const playSound = (audioElement) => {
        if (audioElement) {
            audioElement.currentTime = 0; // Rewind to start
            audioElement.play().catch(error => {
                console.warn("Sound playback prevented:", error);
            });
        }
    };

    // Function to get URL parameters (kept for potential future use, but not used for money/lumber)
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Initial inventory counts (starting at 0, loaded from localStorage)
    let currentInventory = JSON.parse(localStorage.getItem('newCityInventory')) || {};
    // Ensure all properties are initialized, especially if loaded from an older save
    currentInventory = {
        widowCash: currentInventory.widowCash || 0,
        widowLumber: currentInventory.widowLumber || 0,
        widowDust: currentInventory.widowDust || 0,
        widowStones: currentInventory.widowStones || 0,
        widowPelt: currentInventory.widowPelt || 0,
        currentAxeIndex: currentInventory.currentAxeIndex || 0,
        ownedAxes: currentInventory.ownedAxes && Array.isArray(currentInventory.ownedAxes) ? currentInventory.ownedAxes : [0],
        // Robustly initialize houses and their grids
        houses: (() => {
            let loadedHouses = currentInventory.houses;
            if (!Array.isArray(loadedHouses)) {
                loadedHouses = [];
            }
            return loadedHouses.map(house => {
                if (house && typeof house === 'object') { // Ensure it's an object
                    // Ensure grid is a valid 2D array
                    if (!Array.isArray(house.grid)) {
                        house.grid = Array(HOUSE_GRID_ROWS).fill(0).map(() => Array(HOUSE_GRID_COLS).fill(0));
                    } else {
                        // Ensure each row is an array and has correct dimensions
                        house.grid = house.grid.map(row => {
                            if (Array.isArray(row) && row.length === HOUSE_GRID_COLS) {
                                return row;
                            } else {
                                return Array(HOUSE_GRID_COLS).fill(0); // Re-initialize malformed rows
                            }
                        });
                        // If the grid itself has wrong number of rows, re-initialize
                        if (house.grid.length !== HOUSE_GRID_ROWS) {
                            house.grid = Array(HOUSE_GRID_ROWS).fill(0).map(() => Array(HOUSE_GRID_COLS).fill(0));
                        }
                    }
                    // Ensure placedFurniture is an array
                    if (!Array.isArray(house.placedFurniture)) {
                        house.placedFurniture = [];
                    }
                    // Initialize chestAxes for existing houses if not present
                    if (!Array.isArray(house.chestAxes)) {
                        house.chestAxes = [];
                    }
                    // Initialize houseName for existing houses if not present
                    if (typeof house.houseName !== 'string') {
                        house.houseName = 'My House';
                    }
                } else {
                    // If house object itself is malformed, return a default house structure
                    return { id: `house-${Date.now()}`, houseName: 'My House', grid: Array(HOUSE_GRID_ROWS).fill(0).map(() => Array(HOUSE_GRID_COLS).fill(0)), placedFurniture: [], chestAxes: [] };
                }
                return house;
            });
        })(),
        ownedFurniture: currentInventory.ownedFurniture || {} // Initialize owned furniture as an object
    };

    // UI elements for displays
    const dynamicContentArea = document.getElementById('dynamicContentArea');
    const moneyDisplay = document.getElementById('moneyDisplay'); 
    const widowLumberDisplay = document.getElementById('widowLumberDisplay'); 
    const widowDustDisplay = document.getElementById('widowDustDisplay'); 
    const widowStonesDisplay = document.getElementById('widowStonesDisplay'); 
    const widowPeltDisplay = document.getElementById('widowPeltDisplay'); 
    const currentAxeNameDisplay = document.getElementById('currentAxeName');
    const currentAxeIconDisplay = document.getElementById('currentAxeIcon');

    // Containers for conditional display
    const widowDustDisplayContainer = document.getElementById('widowDustDisplayContainer');
    const widowStonesDisplayContainer = document.getElementById('widowStonesDisplayContainer');
    const widowPeltDisplayContainer = document.getElementById('widowPeltDisplayContainer');


    // Navigation buttons
    const widowTreesNavButton = document.getElementById('widowTreesNavButton');
    const lumbermillNavButton = document.getElementById('lumbermillNavButton');
    const shopNavButton = document.getElementById('shopNavButton'); 
    const questsNavButton = document.getElementById('questsNavButton'); 
    const houseNavButton = document.getElementById('houseNavButton'); 
    const teleportNavButton = document.getElementById('teleportNavButton'); 
    const teleportModal = document.getElementById('teleportModal'); 
    const closeTeleportModalButton = document.getElementById('closeTeleportModal'); 

    // State variables for chopping, selling, and quests
    let isChoppingWidowLumber = false;
    let choppingProgress = 0; // 0-100
    let choppingIntervalRef = null;
    let currentChoppingTreeId = null;

    let isSellingAnyItem = false; // General flag for any selling activity

    // Quest variables - UPDATED
    let currentActiveQuest = null; // Stores the current active quest object
    let questProgress = 0; // Tracks progress for the current quest
    
    // House building variables - UPDATED
    let currentHouseAction = 'blockPlace'; // 'blockPlace', 'furniturePlace', or 'remove'
    let currentBuildingBlockType = 'wall'; // Default block type for building
    let selectedFurnitureItem = null; // Stores the furniture item object selected for placement

    // Track dragging state for block and stretchable furniture placement
    let isDragging = false;
    let dragStartGrid = { row: -1, col: -1 };
    
    // New variables for turbo delete
    let isRemoving = false; // Flag to indicate if continuous removal is active
    let removeIntervalRef = null; // Reference to the interval for continuous removal

    let currentHouseIndex = 0; // Index of the house being edited (assuming only one for now)

    let houseCanvas = null;
    let houseCtx = null;

    // Chest Modal variables
    let chestModal = null;
    let chestAxeList = null;
    let closeChestModalButton = null;

    // Widow Tree data - Added more trees to fill the larger canvas
    const widowTrees = [
        { id: 'widowTree1', top: '10%', left: '5%', cutTime: 3000, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree2', top: '30%', left: '20%', cutTime: 3500, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree3', top: '15%', left: '40%', cutTime: 2800, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree4', top: '40%', left: '55%', cutTime: 4000, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree5', top: '25%', left: '75%', cutTime: 3200, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree6', top: '55%', left: '10%', cutTime: 3100, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree7', top: '70%', left: '35%', cutTime: 3800, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree8', top: '45%', left: '85%', cutTime: 2900, imageUrl: 'riverhall/widow-tree.png' },
        { id: 'widowTree9', top: '80%', left: '60%', cutTime: 3300, imageUrl: 'riverhall/widow-tree.png' },
    ];

    // Current active view in New City
    let currentView = 'widowTrees'; // Default view

    // Function to update all inventory displays and local storage
    const updateDisplays = () => {
        moneyDisplay.textContent = currentInventory.widowCash;
        widowLumberDisplay.textContent = currentInventory.widowLumber;
        widowDustDisplay.textContent = currentInventory.widowDust;
        widowStonesDisplay.textContent = currentInventory.widowStones;
        widowPeltDisplay.textContent = currentInventory.widowPelt;
        
        // Update current axe display
        const currentAxe = axes[currentInventory.currentAxeIndex];
        currentAxeNameDisplay.textContent = currentAxe.name;
        currentAxeIconDisplay.src = currentAxe.imageUrl;

        localStorage.setItem('newCityInventory', JSON.stringify(currentInventory));
        console.log("Current Inventory:", currentInventory);

        // Conditionally show/hide inventory displays
        if (currentInventory.widowDust > 0) {
            widowDustDisplayContainer.classList.remove('hidden');
        } else {
            widowDustDisplayContainer.classList.add('hidden');
        }
        if (currentInventory.widowStones > 0) {
            widowStonesDisplayContainer.classList.remove('hidden');
        } else {
            widowStonesDisplayContainer.classList.add('hidden');
        }
        if (currentInventory.widowPelt > 0) {
            widowPeltDisplayContainer.classList.remove('hidden');
        } else {
            widowPeltDisplayContainer.classList.add('hidden');
        }
    };

    // Function to handle chopping widow lumber
    const chopWidowLumber = (treeId) => {
        // Only prevent chopping if another chopping is already in progress or selling is in progress.
        // Quests do not prevent chopping.
        if (isChoppingWidowLumber || isSellingAnyItem) {
            console.log("Activity already in progress!");
            return;
        }

        const treeToCut = widowTrees.find(tree => tree.id === treeId); 
        if (!treeToCut) return;

        isChoppingWidowLumber = true; 
        currentChoppingTreeId = treeId;
        choppingProgress = 0;
        renderApp(); // Re-render to update UI for active chopping

        const treeElement = document.getElementById(`widow-tree-${treeToCut.id}`); 
        if (treeElement) {
            treeElement.classList.add('animate-shake');
        }

        const intervalTime = 50;
        const currentAxe = axes[currentInventory.currentAxeIndex]; // Get the currently equipped axe
        // Adjust totalSteps based on axe efficiency
        const totalSteps = treeToCut.cutTime / intervalTime / currentAxe.efficiency; 
        const progressPerStep = 100 / totalSteps;

        choppingIntervalRef = setInterval(() => {
            choppingProgress += progressPerStep;
            const currentTreeWrapperInInterval = document.getElementById(`widow-tree-${currentChoppingTreeId}`).parentNode; 
            if (currentTreeWrapperInInterval) {
                const progressBar = currentTreeWrapperInInterval.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = `${choppingProgress}%`;
                }
            }

            if (choppingProgress >= 100) {
                choppingProgress = 100;
                clearInterval(choppingIntervalRef);
                choppingIntervalRef = null;

                // Guaranteed Widow Lumber drop, but NO CASH from cutting trees
                currentInventory.widowLumber++;
                // REMOVED: currentInventory.widowCash += 3; // No cash from cutting trees

                // Weighted random drop logic for additional item (excluding Widow Lumber)
                const dropChances = [
                    { item: 'widowDust', weight: 40 },    // 40%
                    { item: 'widowPelt', weight: 30 },    // 30%
                    { item: 'widowStones', weight: 30 }    // 30%
                ];

                let totalWeight = dropChances.reduce((sum, drop) => sum + drop.weight, 0);
                let randomNum = Math.random() * totalWeight;
                let additionalDroppedItem = null;

                for (let i = 0; i < dropChances.length; i++) {
                    randomNum -= dropChances[i].weight;
                    if (randomNum < 0) {
                        additionalDroppedItem = dropChances[i].item;
                        break;
                    }
                }
                
                // Only add the additional item if it's not null
                if (additionalDroppedItem) {
                     currentInventory[additionalDroppedItem]++; 
                     console.log(`Chopped 1 ${items[additionalDroppedItem].name}! Total: ${currentInventory[additionalDroppedItem]}`);
                }
               
                // Update quest progress if active and it's a 'chop' quest for widowLumber
                if (currentActiveQuest && currentActiveQuest.type === 'chop' && currentActiveQuest.targetItem === 'widowLumber') {
                    questProgress++;
                    questProgress = Math.min(questProgress, currentActiveQuest.quantity); // Cap progress
                    if (questProgress >= currentActiveQuest.quantity) {
                        completeQuest();
                    }
                }
                // Update quest progress for 'collect' quests if the dropped item is the target
                if (currentActiveQuest && currentActiveQuest.type === 'collect' && additionalDroppedItem === currentActiveQuest.targetItem) {
                    questProgress = Math.min(currentInventory[currentActiveQuest.targetItem], currentActiveQuest.quantity);
                    if (questProgress >= currentActiveQuest.quantity) {
                        completeQuest();
                    }
                }

                updateDisplays(); // Update displays and save to local storage
                console.log(`Guaranteed 1 Widow Lumber! Total Lumber: ${currentInventory.widowLumber}, Total Cash: ${currentInventory.widowCash}`);
                
                // Reset chopping state to allow new actions
                isChoppingWidowLumber = false;
                currentChoppingTreeId = null;
                choppingProgress = 0; // Reset progress for next chop
                renderApp(); // Re-render to update UI (enable other trees, reset progress bar visuals)
            }
        }, intervalTime);
    };

    // --- Widow Trees View Logic ---
    const renderWidowTreesView = () => {
        const widowTreesBiomeDiv = document.createElement('div');
        widowTreesBiomeDiv.className = "widow-trees-biome-container"; 
        widowTreesBiomeDiv.innerHTML = `
            <h2 class="text-3xl font-bold text-red-400 mb-6">Widow Trees</h2>
            <p class="text-lg text-stone-300 mb-4">Click on trees to chop for various items!</p>
        `;

        widowTrees.forEach(treeData => { 
            const treeWrapper = document.createElement('div');
            treeWrapper.style.position = 'absolute';
            treeWrapper.style.top = treeData.top;
            treeWrapper.style.left = treeData.left;
            treeWrapper.style.width = '80px';
            treeWrapper.style.height = '120px';

            const treeElement = document.createElement('img');
            treeElement.id = `widow-tree-${treeData.id}`; 
            // Removed currentActiveQuest check from class list
            treeElement.className = `widow-tree-image ${isChoppingWidowLumber && currentChoppingTreeId !== treeData.id ? 'opacity-70 cursor-not-allowed' : ''}`; 
            treeElement.src = treeData.imageUrl;
            treeElement.alt = `Widow Tree ${treeData.id}`; 

            // Only disable clicking if chopping is in progress or selling is in progress
            if (!isChoppingWidowLumber && !isSellingAnyItem) {
                treeElement.addEventListener('click', () => {
                    playSound(clickSound); // Play click sound
                    chopWidowLumber(treeData.id);
                }); 
            } else {
                treeElement.classList.add('cursor-not-allowed');
            }

            // Add hover sound to trees
            treeElement.addEventListener('mouseover', () => playSound(hoverSound));

            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = "progress-bar-container";
            const progressBar = document.createElement('div');
            progressBar.className = `progress-bar progress-bar-red`;
            progressBarContainer.appendChild(progressBar);
            
            treeWrapper.appendChild(treeElement); 
            treeWrapper.appendChild(progressBarContainer); 

            if (isChoppingWidowLumber && currentChoppingTreeId === treeData.id) { 
                progressBarContainer.classList.remove('hidden');
                progressBar.style.width = `${choppingProgress}%`;
                treeElement.classList.add('animate-shake');
            } else {
                progressBarContainer.classList.add('hidden');
                progressBar.style.width = '0%'; // Reset progress bar
                treeElement.classList.remove('animate-shake');
            }

            widowTreesBiomeDiv.appendChild(treeWrapper); 
        });

        return widowTreesBiomeDiv;
    };

    // Function to calculate a dynamic exchange rate for an item (now fixed)
    const calculateExchangeRate = (baseRate) => {
        // The rate is now fixed, no randomness
        return baseRate;
    };

    // Function to handle selling any item (now sells all of a type instantly)
    const sellItem = (itemType) => {
        // Only prevent selling if another activity is in progress.
        // Quests do not prevent selling.
        if (isSellingAnyItem || isChoppingWidowLumber) {
            console.log("Activity already in progress!");
            return;
        }

        const amountToSell = currentInventory[itemType];
        if (amountToSell <= 0) {
            console.log(`Not enough ${items[itemType].name} to sell!`);
            const messageDiv = document.getElementById('lumbermillMessage') || document.getElementById('shopMessage'); // Check both
            if (messageDiv) {
                messageDiv.textContent = `You need ${items[itemType].name} to sell!`;
                messageDiv.classList.remove('hidden');
                setTimeout(() => messageDiv.classList.add('hidden'), 3000);
            }
            return;
        }

        // Calculate total cash from selling all items of this type
        const itemExchangeRate = calculateExchangeRate(items[itemType].baseSellRate);
        const totalCashEarned = itemExchangeRate * amountToSell;

        // Deduct items and add money instantly
        currentInventory[itemType] = 0; // Sell all
        currentInventory.widowCash += totalCashEarned; 
        
        // Update quest progress if active and it's a 'sell' quest for the itemType
        if (currentActiveQuest && currentActiveQuest.type === 'sell' && currentActiveQuest.targetItem === itemType) {
            // For a 'sell' quest, if the item is sold, the quest is likely completed instantly
            questProgress = Math.min(amountToSell, currentActiveQuest.quantity); // Track how much was sold towards quest
            if (questProgress >= currentActiveQuest.quantity) {
                completeQuest();
            }
        }

        updateDisplays(); // Update displays and save to local storage
        console.log(`Sold all ${amountToSell} ${items[itemType].name} for ${totalCashEarned} Widow Cash!`);
        renderApp(); // Re-render to update UI (enable button, clear progress)
    };

    // Function to handle selling an axe
    const sellAxe = (axeIndex) => {
        // Only prevent selling if another activity is in progress.
        // Quests do not prevent selling.
        if (isSellingAnyItem || isChoppingWidowLumber) {
            console.log("Activity already in progress!");
            return;
        }

        // Basic Axe (index 0) cannot be sold
        if (axeIndex === 0) {
            const messageDiv = document.getElementById('shopMessage');
            if (messageDiv) {
                messageDiv.textContent = `You cannot sell the Basic Axe!`;
                messageDiv.classList.remove('hidden');
                setTimeout(() => messageDiv.classList.add('hidden'), 3000);
            }
            console.log("Cannot sell Basic Axe.");
            return;
        }

        const axeToSell = axes[axeIndex];
        const ownedAxeIndexInArray = currentInventory.ownedAxes.indexOf(axeIndex);

        if (ownedAxeIndexInArray === -1) {
            console.log(`You do not own the ${axeToSell.name}.`);
            return;
        }

        // Remove the axe from ownedAxes
        currentInventory.ownedAxes.splice(ownedAxeIndexInArray, 1);
        
        // Determine which currency to refund based on the axe's cost currency
        if (axeToSell.cost.currency === 'widowCash') {
            currentInventory.widowCash += axeToSell.cost.amount; // Refund original cash cost
            console.log(`Sold ${axeToSell.name} for ${axeToSell.cost.amount} Widow Cash!`);
        } else if (axeToSell.cost.currency === 'widowStones') {
            currentInventory.widowStones += axeToSell.cost.amount; // Refund original stone cost
            console.log(`Sold ${axeToSell.name} for ${axeToSell.cost.amount} Widow Stones!`);
        }

        // If the sold axe was the currently equipped one, equip the Basic Axe
        if (currentInventory.currentAxeIndex === axeIndex) {
            currentInventory.currentAxeIndex = 0; // Equip Basic Axe
            console.log(`Equipped Basic Axe.`);
        }

        updateDisplays();
        renderApp(); // Re-render to update the shop view
    };


    // --- Lumbermill View Logic ---
    const renderLumbermillView = () => {
        const lumbermillDiv = document.createElement('div');
        lumbermillDiv.className = "lumbermill-container";
        let sellableItemsHtml = '';

        // Only allow selling of Widow Lumber in Lumbermill
        const item = items.widowLumber;
        const key = 'widowLumber';

        const currentCount = currentInventory[key];
        const buttonId = `sell${toPascalCase(key)}Button`;
        
        // Calculate total potential earnings for all current lumber (now fixed based on baseSellRate)
        const totalLumberCash = calculateExchangeRate(item.baseSellRate) * currentCount;

        sellableItemsHtml += `
            <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center w-full max-w-xs mb-4">
                <p class="text-xl font-semibold mb-2">Sell ${item.name}</p>
                <p class="text-lg text-yellow-300 mb-2">Current ${item.name}: ${currentCount}</p>
                <button id="${buttonId}" class="sell-button" ${currentCount <= 0 ? 'disabled' : ''}>Sell All ${item.name}</button>
            </div>
        `;
        

        lumbermillDiv.innerHTML = `
            <h2 class="text-3xl font-bold text-green-400 mb-6">The Lumbermill</h2>
            <p class="text-lg text-stone-300 mb-4">Sell your Widow Lumber for Widow Cash!</p>
            <p id="exchangeRateDisplay" class="text-xl font-semibold text-yellow-300 mb-4">
                You will get: ${totalLumberCash} Widow Cash
            </p>
            <div class="w-full flex flex-col items-center">
                ${sellableItemsHtml}
            </div>
            <p id="lumbermillMessage" class="text-red-400 mt-4 hidden"></p>
        `;

        // Add event listener for the lumber sell button
        const sellButton = lumbermillDiv.querySelector(`#sell${toPascalCase('widowLumber')}Button`);
        if (sellButton) {
            sellButton.addEventListener('click', () => {
                playSound(clickSound); // Play click sound
                sellItem('widowLumber');
            });
            sellButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
        }

        return lumbermillDiv;
    };


    // --- Shop View Logic ---
    const renderShopView = () => {
        const shopDiv = document.createElement('div');
        // Adjusted lumbermill-container width to be 100% to fit parent container's max-width
        shopDiv.className = "lumbermill-container w-full"; 
        shopDiv.innerHTML = `
            <h2 class="text-3xl font-bold text-purple-400 mb-6">RiverHall Inn</h2>
            <p class="text-lg text-stone-300 mb-4">Choose a category:</p>
            <div class="flex justify-center gap-4 mb-8">
                <button id="shopAxesButton" class="biome-nav-button">Axes</button>
                <button id="shopFurnitureButton" class="biome-nav-button">Furniture</button> <!-- New: Furniture button -->
                <button id="shopSellButton" class="biome-nav-button">Sell</button>
            </div>
            <div id="shopCategoryContent" class="w-full">
                <!-- Category specific content will be loaded here -->
            </div>
            <p id="shopMessage" class="text-red-400 mt-4 hidden"></p>
        `;

        const shopAxesButton = shopDiv.querySelector('#shopAxesButton');
        const shopFurnitureButton = shopDiv.querySelector('#shopFurnitureButton'); // New: Furniture button
        const shopSellButton = shopDiv.querySelector('#shopSellButton');
        const shopCategoryContent = shopDiv.querySelector('#shopCategoryContent');

        // Add hover sounds to these category buttons
        shopAxesButton.addEventListener('mouseover', () => playSound(hoverSound));
        shopFurnitureButton.addEventListener('mouseover', () => playSound(hoverSound));
        shopSellButton.addEventListener('mouseover', () => playSound(hoverSound));

        let currentShopCategory = 'axes'; // Default shop category
        let currentFurnitureSubCategory = 'all'; // Default furniture sub-category

        const updateShopCategoryButtons = () => {
            shopAxesButton.classList.remove('active');
            shopFurnitureButton.classList.remove('active');
            shopSellButton.classList.remove('active');
            if (currentShopCategory === 'axes') {
                shopAxesButton.classList.add('active');
            } else if (currentShopCategory === 'furniture') {
                shopFurnitureButton.classList.add('active');
            } else if (currentShopCategory === 'sell') {
                shopSellButton.classList.add('active');
            }
        };

        // Function to render Axes section
        const renderAxesSection = () => {
            currentShopCategory = 'axes';
            updateShopCategoryButtons();
            let axesHtml = '';
            axes.forEach((axe, index) => {
                const isOwned = currentInventory.ownedAxes.includes(index);
                const isEquipped = currentInventory.currentAxeIndex === index;
                
                let canAfford = false;
                let currencyIcon = '';
                let currencyName = '';

                if (axe.cost.currency === 'widowCash') {
                    canAfford = currentInventory.widowCash >= axe.cost.amount;
                    currencyIcon = 'riverhall/widow-cash.png';
                    currencyName = 'Widow Cash';
                } else if (axe.cost.currency === 'widowStones') {
                    canAfford = currentInventory.widowStones >= axe.cost.amount;
                    currencyIcon = 'riverhall/items/widow-stone.png';
                    currencyName = 'Widow Stones';
                }

                let buttonClass = 'buy-button';
                let buttonText = 'Buy';
                let isDisabled = false;
                let efficiencyText = '';

                if (isOwned) {
                    buttonClass = 'equip-button';
                    buttonText = isEquipped ? 'Equipped' : 'Equip';
                    isDisabled = isEquipped;
                } else {
                    // Removed currentActiveQuest from disabled check
                    isDisabled = !canAfford; 
                }

                // Calculate how much faster it is compared to the Basic Axe (efficiency 1)
                if (axe.efficiency > 1) {
                    const percentageFaster = ((axe.efficiency - 1) * 100).toFixed(0);
                    efficiencyText = `<p class="text-sm text-green-400">Cuts ${percentageFaster}% faster!</p>`;
                } else if (axe.efficiency === 1) {
                    efficiencyText = `<p class="text-sm text-stone-400">Standard cutting speed.</p>`;
                }


                axesHtml += `
                    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center mb-4">
                        <img src="${axe.imageUrl}" alt="${axe.name}" class="w-16 h-16 mb-2">
                        <p class="text-xl font-semibold">${axe.name}</p>
                        <p class="text-lg text-yellow-300 flex items-center">
                            Cost: ${axe.cost.amount} 
                            <img src="${currencyIcon}" alt="${currencyName} Icon" class="inline-block w-5 h-5 ml-1 mr-1"/>
                            ${currencyName}
                        </p>
                        ${efficiencyText}
                        <button class="${buttonClass} mt-2" data-axe-index="${index}" ${isDisabled ? 'disabled' : ''}>${buttonText}</button>
                    </div>
                `;
            });

            shopCategoryContent.innerHTML = `
                <h3 class="text-2xl font-bold text-blue-300 mb-4">Axes</h3>
                <p class="text-md text-stone-400 mb-4">Buy powerful axes to chop faster!</p>
                <div class="flex flex-wrap justify-center gap-4 max-h-[calc(80vh-270px)] overflow-y-auto p-2 rounded-lg"> <!-- Added max-h and overflow-y-auto -->
                    ${axesHtml}
                </div>
            `;

            // Add event listeners for axe buttons (buy/equip)
            shopCategoryContent.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', (event) => {
                    playSound(clickSound); // Play click sound
                    const axeIndex = parseInt(event.target.dataset.axeIndex);
                    const selectedAxe = axes[axeIndex];
                    const isOwned = currentInventory.ownedAxes.includes(axeIndex);

                    if (isOwned) {
                        // Equip the axe
                        currentInventory.currentAxeIndex = axeIndex;
                        console.log(`Equipped ${selectedAxe.name}!`);
                    } else {
                        // Buy the axe
                        let hasEnoughCurrency = false;
                        if (selectedAxe.cost.currency === 'widowCash') {
                            hasEnoughCurrency = currentInventory.widowCash >= selectedAxe.cost.amount;
                        } else if (selectedAxe.cost.currency === 'widowStones') {
                            hasEnoughCurrency = currentInventory.widowStones >= selectedAxe.cost.amount;
                        }

                        if (hasEnoughCurrency) {
                            if (selectedAxe.cost.currency === 'widowCash') {
                                currentInventory.widowCash -= selectedAxe.cost.amount;
                            } else if (selectedAxe.cost.currency === 'widowStones') {
                                currentInventory.widowStones -= selectedAxe.cost.amount;
                            }
                            
                            currentInventory.ownedAxes.push(axeIndex); // Add to owned axes
                            currentInventory.currentAxeIndex = axeIndex; // Equip after buying
                            console.log(`Bought and equipped ${selectedAxe.name}!`);
                        } else {
                            const messageDiv = document.getElementById('shopMessage');
                            if (messageDiv) {
                                messageDiv.textContent = `Not enough ${selectedAxe.cost.currency === 'widowCash' ? 'Widow Cash' : 'Widow Stones'} to buy ${selectedAxe.name}!`;
                                messageDiv.classList.remove('hidden');
                                setTimeout(() => messageDiv.classList.add('hidden'), 3000);
                            }
                            console.log(`Not enough ${selectedAxe.cost.currency === 'widowCash' ? 'Widow Cash' : 'Widow Stones'} to buy ${selectedAxe.name}!`);
                        }
                    }
                    updateDisplays();
                    renderApp(); // Re-render to update shop and tree views
                });
                button.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
            });
        };

        // Function to render Furniture section - UPDATED
        const renderFurnitureSection = () => {
            currentShopCategory = 'furniture';
            updateShopCategoryButtons();

            // Check if a house is owned
            if (currentInventory.houses.length === 0) {
                shopCategoryContent.innerHTML = `
                    <p class="text-xl font-bold text-red-400 mb-4">This area isn't quite for you yet.</p>
                    <p class="text-lg text-stone-300 mb-4">You need to buy a house first to access furniture!</p>
                `;
                const messageDiv = document.getElementById('shopMessage');
                if (messageDiv) {
                    messageDiv.textContent = 'Buy a house from the "House" section first!';
                    messageDiv.classList.remove('hidden');
                    setTimeout(() => messageDiv.classList.add('hidden'), 3000);
                }
                return; // Stop rendering furniture details
            }

            // Sub-category buttons for furniture
            let subCategoryButtonsHtml = `
                <div class="flex justify-center gap-4 mb-4 flex-wrap">
                    <button id="allFurnitureButton" class="biome-nav-button ${currentFurnitureSubCategory === 'all' ? 'active' : ''}" data-category="all">All</button>
                    <button id="decorItemsButton" class="biome-nav-button ${currentFurnitureSubCategory === 'decor' ? 'active' : ''}" data-category="decor">Decor</button>
                    <button id="outdoorItemsButton" class="biome-nav-button ${currentFurnitureSubCategory === 'outdoor' ? 'active' : ''}" data-category="outdoor">Outdoor</button>
                    <button id="wallsItemsButton" class="biome-nav-button ${currentFurnitureSubCategory === 'walls' ? 'active' : ''}" data-category="walls">Walls</button>
                </div>
            `;

            let filteredFurniture = furnitureItems;
            if (currentFurnitureSubCategory !== 'all') {
                filteredFurniture = furnitureItems.filter(item => item.category === currentFurnitureSubCategory);
            }

            let furnitureHtml = '';
            filteredFurniture.forEach(item => {
                const ownedQuantity = currentInventory.ownedFurniture[item.id] || 0;
                const canAfford = currentInventory.widowCash >= item.cost.amount;
                
                let buttonClass = 'buy-button';
                let buttonText = 'Buy';
                let isDisabled = !canAfford;

                furnitureHtml += `
                    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center mb-4">
                        <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 mb-2">
                        <p class="text-xl font-semibold">${item.name}</p>
                        <p class="text-lg text-yellow-300 flex items-center">
                            Cost: ${item.cost.amount} 
                            <img src="riverhall/widow-cash.png" alt="Widow Cash Icon" class="inline-block w-5 h-5 ml-1 mr-1"/>
                            Widow Cash
                        </p>
                        <p class="text-sm text-stone-400">Owned: ${ownedQuantity}</p>
                        <button class="${buttonClass} mt-2" data-item-id="${item.id}" ${isDisabled ? 'disabled' : ''}>${buttonText}</button>
                    </div>
                `;
            });

            shopCategoryContent.innerHTML = `
                <h3 class="text-2xl font-bold text-green-300 mb-4">Furniture</h3>
                <p class="text-md text-stone-400 mb-4">Decorate your house with these items!</p>
                ${subCategoryButtonsHtml}
                <div class="flex flex-wrap justify-center gap-4 max-h-[calc(80vh-320px)] overflow-y-auto p-2 rounded-lg">
                    ${furnitureHtml}
                </div>
            `;

            // Add event listeners for sub-category buttons
            shopCategoryContent.querySelectorAll('.biome-nav-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    playSound(clickSound); // Play click sound
                    currentFurnitureSubCategory = event.target.dataset.category;
                    renderFurnitureSection(); // Re-render furniture section with filtered items
                });
                button.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
            });

            shopCategoryContent.querySelectorAll('button[data-item-id]').forEach(button => {
                button.addEventListener('click', (event) => {
                    playSound(clickSound); // Play click sound
                    const itemId = event.target.closest('button').dataset.itemId;
                    const selectedItem = furnitureItems.find(f => f.id === itemId);

                    if (selectedItem) {
                        if (currentInventory.widowCash >= selectedItem.cost.amount) {
                            currentInventory.widowCash -= selectedItem.cost.amount;
                            currentInventory.ownedFurniture[itemId] = (currentInventory.ownedFurniture[itemId] || 0) + 1;
                            console.log(`Bought ${selectedItem.name}! Total owned: ${currentInventory.ownedFurniture[itemId]}`);
                            updateDisplays();
                            renderApp(); // Re-render shop to update button state and quantity
                        } else {
                            const messageDiv = document.getElementById('shopMessage');
                            if (messageDiv) {
                                messageDiv.textContent = `Not enough Widow Cash to buy ${selectedItem.name}!`;
                                messageDiv.classList.remove('hidden');
                                setTimeout(() => messageDiv.classList.add('hidden'), 3000);
                            }
                            console.log(`Not enough Widow Cash to buy ${selectedItem.name}!`);
                        }
                    }
                });
                button.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
            });
        };

        // Function to render Sell section
        const renderSellSection = () => {
            currentShopCategory = 'sell';
            updateShopCategoryButtons();
            let sellableItemsHtml = '';
            // Only allow selling of Dust, Stones, Pelt in the Shop's sell section
            const itemsToSellInShop = ['widowDust', 'widowStones', 'widowPelt'];

            itemsToSellInShop.forEach(key => {
                const item = items[key];
                const currentCount = currentInventory[key];
                const buttonId = `sell${toPascalCase(key)}ShopButton`; // Unique ID for shop sell buttons
                const totalItemCash = calculateExchangeRate(item.baseSellRate) * currentCount;

                sellableItemsHtml += `
                    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center max-w-xs mb-4"> <!-- Removed w-full -->
                        <p class="text-xl font-semibold mb-2">Sell ${item.name}</p>
                        <p class="text-lg text-yellow-300 mb-2">Current ${item.name}: ${currentCount}</p>
                        <p class="text-md text-stone-400 mb-2">You will get: ${totalItemCash} Widow Cash</p>
                        <button id="${buttonId}" class="sell-button" ${currentCount <= 0 ? 'disabled' : ''}>Sell All ${item.name}</button>
                    </div>
                `;
            });

            // Add owned axes to the sellable items list
            currentInventory.ownedAxes.forEach(axeIndex => {
                const axe = axes[axeIndex];
                // Do not allow selling of the Basic Axe (index 0)
                if (axeIndex === 0) return; 

                const buttonId = `sellAxe${axeIndex}Button`;
                sellableItemsHtml += `
                    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center max-w-xs mb-4"> <!-- Removed w-full -->
                        <img src="${axe.imageUrl}" alt="${axe.name}" class="w-16 h-16 mb-2">
                        <p class="text-xl font-semibold mb-2">Sell ${axe.name}</p>
                        <p class="text-lg text-yellow-300 mb-2">Sell Price: ${axe.cost.amount} ${formatItemNameForDisplay(axe.cost.currency)}</p>
                        <button id="${buttonId}" class="sell-button">Sell ${axe.name}</button>
                    </div>
                `;
            });


            shopCategoryContent.innerHTML = `
                <h3 class="text-2xl font-bold text-green-300 mb-4">Sell Inventory</h3>
                <p class="text-md text-stone-400 mb-4">Sell your items and axes for Widow Cash.</p>
                <div class="flex flex-row flex-wrap justify-center gap-4 max-h-[calc(80vh-270px)] overflow-y-auto p-2 rounded-lg"> <!-- Added max-h and overflow-y-auto -->
                    ${sellableItemsHtml}
                </div>
            `;

            // Add event listeners for sell buttons in the shop's sell section
            itemsToSellInShop.forEach(key => {
                const buttonId = `sell${toPascalCase(key)}ShopButton`;
                const sellButton = shopCategoryContent.querySelector(`#${buttonId}`);
                if (sellButton) {
                    sellButton.addEventListener('click', () => {
                        playSound(clickSound); // Play click sound
                        sellItem(key);
                    });
                    sellButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                }
            });

            // Add event listeners for axe sell buttons
            currentInventory.ownedAxes.forEach(axeIndex => {
                if (axeIndex === 0) return; // Skip Basic Axe
                const buttonId = `sellAxe${axeIndex}Button`;
                const sellButton = shopCategoryContent.querySelector(`#${buttonId}`);
                if (sellButton) {
                    sellButton.addEventListener('click', () => {
                        playSound(clickSound); // Play click sound
                        sellAxe(axeIndex);
                    });
                    sellButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                }
            });
        };

        // Default to Axes section when shop is opened
        renderAxesSection();

        shopAxesButton.addEventListener('click', () => {
            playSound(clickSound); // Play click sound
            renderAxesSection();
        });
        shopFurnitureButton.addEventListener('click', () => {
            playSound(clickSound); // Play click sound
            renderFurnitureSection();
        }); // New: Furniture button listener
        shopSellButton.addEventListener('click', () => {
            playSound(clickSound); // Play click sound
            renderSellSection();
        });

        return shopDiv;
    };

    // --- Quests View Logic ---
    const renderQuestsView = () => {
        const questsDiv = document.createElement('div');
        questsDiv.className = "lumbermill-container w-full";
        
        let questContentHtml = '';

        if (currentActiveQuest) {
            // Display active quest details
            const progressPercentage = (questProgress / currentActiveQuest.quantity) * 100;
            questContentHtml = `
                <h3 class="text-2xl font-bold text-yellow-300 mb-4">Current Quest:</h3>
                <p class="text-lg text-stone-300 mb-2">${currentActiveQuest.description}</p>
                <p class="text-md text-stone-400 mb-4">Progress: ${questProgress} / ${currentActiveQuest.quantity} ${formatItemNameForDisplay(currentActiveQuest.targetItem)}</p>
                <div class="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <div class="bg-blue-500 h-4 rounded-full" style="width: ${progressPercentage}%"></div>
                </div>
                <p class="text-sm text-gray-400">Complete this quest to get new quests.</p>
            `;
        } else {
            // Display list of available quests
            let availableQuestsHtml = '';
            availableQuests.forEach(quest => {
                const canStart = currentInventory[quest.targetItem] >= quest.quantity || quest.type === 'chop'; // Can start if enough items or if it's a chopping quest
                const startButtonDisabled = !canStart ? 'disabled' : '';
                const startButtonText = 'Start Quest';
                const requiredText = quest.type === 'chop' ? `Requires chopping ${quest.quantity} ${formatItemNameForDisplay(quest.targetItem)}` : `Requires ${quest.quantity} ${formatItemNameForDisplay(quest.targetItem)}`;

                availableQuestsHtml += `
                    <div class="bg-gray-800 p-4 rounded-lg flex flex-col items-center w-full max-w-xs mb-4">
                        <p class="text-xl font-semibold mb-2">${quest.description}</p>
                        <p class="text-lg text-stone-300 mb-2">${requiredText}</p>
                        <p class="text-md text-yellow-300 mb-2">Rewards:</p>
                        <ul class="text-left mx-auto">
                            ${Object.entries(quest.rewards).map(([item, amount]) => `<li>${amount} ${formatItemNameForDisplay(item)}</li>`).join('')}
                        </ul>
                        <button id="startQuest-${quest.id}" class="buy-button mt-4" data-quest-id="${quest.id}" ${startButtonDisabled}>${startButtonText}</button>
                    </div>
                `;
            });

            questContentHtml = `
                <h3 class="text-2xl font-bold text-blue-300 mb-4">Available Quests:</h3>
                <p class="text-lg text-stone-300 mb-4">Choose a quest to start!</p>
                <div class="flex flex-wrap justify-center gap-4 max-h-[calc(80vh-270px)] overflow-y-auto p-2 rounded-lg">
                    ${availableQuestsHtml}
                </div>
                <p id="questMessage" class="text-red-400 mt-4 hidden"></p>
            `;
        }

        questsDiv.innerHTML = `
            <h2 class="text-3xl font-bold text-orange-400 mb-6">Quests</h2>
            ${questContentHtml}
            <p id="questMessage" class="text-red-400 mt-4 hidden"></p>
        `;

        // Add event listeners for "Start Quest" buttons
        if (!currentActiveQuest) {
            questsDiv.querySelectorAll('button[data-quest-id]').forEach(button => {
                button.addEventListener('click', (event) => {
                    playSound(clickSound); // Play click sound
                    const questId = event.target.dataset.questId;
                    startQuest(questId);
                });
                button.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
            });
        }

        return questsDiv;
    };

    // Function to start a specific quest
    const startQuest = (questId) => {
        const questToStart = availableQuests.find(q => q.id === questId);
        if (questToStart) {
            currentActiveQuest = questToStart;
            // For 'chop' quests, progress starts at 0. For 'collect' quests, progress starts at current inventory.
            questProgress = (currentActiveQuest.type === 'collect') ? currentInventory[currentActiveQuest.targetItem] : 0;
            
            // Ensure questProgress doesn't exceed quantity if starting a collect quest with more items than needed
            questProgress = Math.min(questProgress, currentActiveQuest.quantity);

            console.log("Quest Started:", currentActiveQuest);
            renderApp(); // Re-render to show active quest
            showQuestMessage(`Quest "${currentActiveQuest.description}" started!`, 'green');
        } else {
            showQuestMessage('Quest not found!', 'red');
        }
    };

    // Function to complete the active quest and give rewards
    const completeQuest = () => {
        if (!currentActiveQuest) return;

        console.log("Quest Completed!");
        // Apply rewards
        for (const rewardItem in currentActiveQuest.rewards) {
            if (currentInventory.hasOwnProperty(rewardItem)) {
                currentInventory[rewardItem] += currentActiveQuest.rewards[rewardItem];
            } else {
                console.warn(`Unknown reward item: ${rewardItem}`);
            }
        }
        updateDisplays();

        showQuestCompletedScreen(currentActiveQuest.rewards);

        // Reset quest state
        currentActiveQuest = null;
        questProgress = 0;
        renderApp(); // Re-render to show "Start New Quest" button
    };

    // Function to show the Quest Completed modal
    const showQuestCompletedScreen = (rewards) => {
        questRewardsList.innerHTML = '';
        for (const item in rewards) {
            const listItem = document.createElement('li');
            listItem.textContent = `${rewards[item]} ${formatItemNameForDisplay(item)}`;
            questRewardsList.appendChild(listItem);
        }
        questCompletedModal.classList.add('show');
        setTimeout(() => {
            questCompletedModal.classList.remove('show');
        }, 4000); // Hide after 4 seconds
    };

    // Function to show messages in the quest view
    const showQuestMessage = (message, type) => {
        const questMessageDiv = document.getElementById('questMessage');
        if (questMessageDiv) {
            questMessageDiv.textContent = message;
            questMessageDiv.className = `text-red-400 mt-4`; // Reset class
            if (type === 'green') {
                questMessageDiv.classList.add('text-green-400');
            } else if (type === 'blue') {
                questMessageDiv.classList.add('text-blue-400');
            } else {
                questMessageDiv.classList.add('text-red-400');
            }
            questMessageDiv.classList.remove('hidden');
            setTimeout(() => questMessageDiv.classList.add('hidden'), 3000);
        }
    };


    // --- House View Logic ---
    let isBuildingModeButtonsVisible = false; // New state variable

    const renderHouseView = () => {
        const houseDiv = document.createElement('div');
        houseDiv.className = "lumbermill-container w-full";
        
        let houseContentHtml = '';

        // Define house cost
        const HOUSE_COST = 5000;

        if (currentInventory.houses.length === 0) {
            // No house owned, show buy button
            const canAffordHouse = currentInventory.widowCash >= HOUSE_COST;
            houseContentHtml = `
                <h3 class="text-2xl font-bold text-yellow-300 mb-4">Own Your Dream Home!</h3>
                <p class="text-lg text-stone-300 mb-4">Purchase a house to start customizing it.</p>
                <p class="text-xl font-semibold text-yellow-300 mb-4">
                    Cost: ${HOUSE_COST} 
                    <img src="riverhall/widow-cash.png" alt="Widow Cash Icon" class="inline-block w-6 h-6 ml-1 mr-1"/>
                    Widow Cash
                </p>
                <button id="buyHouseButton" class="buy-button" ${!canAffordHouse ? 'disabled' : ''}>Buy House</button>
                <p id="houseMessage" class="text-red-400 mt-4 hidden"></p>
            `;
        } else {
            // House owned, show building tools - UPDATED
            const currentHouseName = currentInventory.houses[currentHouseIndex].houseName || 'My House';
            houseContentHtml = `
                <h3 class="text-2xl font-bold text-blue-300 mb-4">Customize Your House: <span id="houseNameDisplay" contenteditable="true" class="text-blue-300 cursor-pointer rounded px-2 py-1 hover:bg-gray-800 transition-colors">${currentHouseName}</span></h3>
                <p class="text-lg text-stone-300 mb-4">Click and drag on the grid to place blocks or furniture.</p>
                
                <div id="editButtonContainer" class="mb-4">
                    <button id="editButton">
                        <img src="riverhall/home/edit.png" alt="Edit Icon"/>
                    </button>
                    <span id="editButtonTooltip" class="absolute bg-gray-700 text-white text-sm px-2 py-1 rounded hidden">Edit</span>
                </div>

                <div id="buildingModeButtonsContainer" class="flex justify-center gap-4 mb-4 flex-wrap ${isBuildingModeButtonsVisible ? '' : 'hidden'}">
                    <button id="selectBlockModeButton" class="house-block-button ${currentHouseAction === 'blockPlace' ? 'active' : ''}">Place Blocks</button>
                    <button id="selectFurnitureModeButton" class="house-block-button ${currentHouseAction === 'furniturePlace' ? 'active' : ''}">Place Furniture</button>
                    <button id="removeObjectButton" class="house-block-button ${currentHouseAction === 'remove' ? 'active' : ''}">Remove Object</button>
                </div>
                <div id="buildingTools" class="flex justify-center gap-4 mb-4 flex-wrap">
                    <!-- Block/Furniture selection will go here -->
                </div>
                <canvas id="houseCanvas" class="border-2 border-gray-600 bg-gray-900 rounded-lg"></canvas>
                <p id="houseMessage" class="text-red-400 mt-4 hidden"></p>
            `;
        }

        houseDiv.innerHTML = `
            <h2 class="text-3xl font-bold text-blue-400 mb-6">My House</h2>
            ${houseContentHtml}
        `;

        // Add event listeners based on whether a house is owned
        if (currentInventory.houses.length === 0) {
            const buyHouseButton = houseDiv.querySelector('#buyHouseButton');
            if (buyHouseButton) {
                buyHouseButton.addEventListener('click', () => {
                    playSound(clickSound); // Play click sound
                    if (currentInventory.widowCash >= HOUSE_COST) {
                        currentInventory.widowCash -= HOUSE_COST;
                        // Initialize a new empty grid for the house and empty furniture array
                        const newGrid = Array(HOUSE_GRID_ROWS).fill(0).map(() => Array(HOUSE_GRID_COLS).fill(0));
                        currentInventory.houses.push({ id: `house-${Date.now()}`, houseName: 'My House', grid: newGrid, placedFurniture: [], chestAxes: [] }); 
                        currentHouseIndex = currentInventory.houses.length - 1; // Select the newly bought house
                        updateDisplays();
                        renderApp(); // Re-render to show the building interface
                        showHouseMessage('House purchased successfully!', 'green');
                    } else {
                        showHouseMessage('Not enough Widow Cash to buy a house!', 'red');
                    }
                });
                buyHouseButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
            }
        } else {
            // Setup canvas and building tools if house is owned
            houseCanvas = houseDiv.querySelector('#houseCanvas');
            houseCtx = houseCanvas.getContext('2d');

            houseCanvas.width = HOUSE_GRID_COLS * BLOCK_SIZE;
            houseCanvas.height = HOUSE_GRID_ROWS * BLOCK_SIZE;

            const buildingToolsDiv = houseDiv.querySelector('#buildingTools');
            const selectBlockModeButton = houseDiv.querySelector('#selectBlockModeButton');
            const selectFurnitureModeButton = houseDiv.querySelector('#selectFurnitureModeButton');
            const removeObjectButton = houseDiv.querySelector('#removeObjectButton');
            const houseNameDisplay = houseDiv.querySelector('#houseNameDisplay'); // Get the house name display element

            // New: Edit button and its container/tooltip
            const editButtonContainer = houseDiv.querySelector('#editButtonContainer');
            const editButton = houseDiv.querySelector('#editButton');
            const editButtonTooltip = houseDiv.querySelector('#editButtonTooltip');
            const buildingModeButtonsContainer = houseDiv.querySelector('#buildingModeButtonsContainer');

            // Event listeners for the new Edit button
            if (editButton) {
                editButton.addEventListener('click', () => {
                    playSound(clickSound); // Play click sound
                    isBuildingModeButtonsVisible = !isBuildingModeButtonsVisible;
                    if (isBuildingModeButtonsVisible) {
                        buildingModeButtonsContainer.classList.remove('hidden');
                        // Ensure a mode is active when buttons become visible
                        if (currentHouseAction === 'blockPlace') renderBlockSelection();
                        else if (currentHouseAction === 'furniturePlace') renderFurnitureSelection();
                        else buildingToolsDiv.innerHTML = `<p class="text-stone-400">Click on an object in your house to remove it.</p>`;
                    } else {
                        buildingModeButtonsContainer.classList.add('hidden');
                        buildingToolsDiv.innerHTML = ''; // Clear sub-tools when collapsed
                    }
                });

                editButton.addEventListener('mouseover', () => {
                    playSound(hoverSound); // Play hover sound
                    editButtonTooltip.classList.remove('hidden');
                });

                editButton.addEventListener('mouseleave', () => {
                    editButtonTooltip.classList.add('hidden');
                });
            }


            // Add event listener for house name change
            if (houseNameDisplay) {
                houseNameDisplay.addEventListener('blur', () => {
                    currentInventory.houses[currentHouseIndex].houseName = houseNameDisplay.textContent;
                    updateDisplays();
                    showHouseMessage('House name updated!', 'blue');
                });
                // Allow pressing Enter to save the name
                houseNameDisplay.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); // Prevent new line
                        houseNameDisplay.blur(); // Trigger blur to save
                    }
                });
            }

            // Add Chest Modal HTML to the body
            const chestModalHtml = `
                <div id="chestModal" class="teleport-modal-overlay">
                    <div class="teleport-modal-content">
                        <button id="closeChestModal" class="teleport-modal-close-button">&times;</button>
                        <h3 class="text-2xl font-bold text-blue-300 mb-6">Chest Inventory</h3>
                        <div id="chestAxeList" class="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                            <!-- Axes will be dynamically inserted here -->
                        </div>
                    </div>
                </div>
            `;
            // Append modal only if it doesn't exist to prevent duplicates on re-render
            if (!document.getElementById('chestModal')) {
                document.body.insertAdjacentHTML('beforeend', chestModalHtml);
            }
            chestModal = document.getElementById('chestModal');
            chestAxeList = document.getElementById('chestAxeList');
            closeChestModalButton = document.getElementById('closeChestModal');

            closeChestModalButton.addEventListener('click', () => {
                playSound(clickSound); // Play click sound
                chestModal.classList.remove('show');
            });
            closeChestModalButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

            const drawHouseGrid = () => {
                houseCtx.clearRect(0, 0, houseCanvas.width, houseCanvas.height);

                const currentHouse = currentInventory.houses[currentHouseIndex];
                // Defensive check for currentHouse and its grid
                if (!currentHouse || !currentHouse.grid || !Array.isArray(currentHouse.grid)) {
                    console.error("Error: currentHouse or its grid is invalid during drawing.", currentHouse);
                    return; // Stop drawing to prevent further errors
                }
                const currentHouseGrid = currentHouse.grid;
                const placedFurniture = currentHouse.placedFurniture; 

                // Draw grid and blocks
                for (let r = 0; r < HOUSE_GRID_ROWS; r++) {
                    // Defensive check for row
                    if (!Array.isArray(currentHouseGrid[r])) {
                        console.warn(`Warning: Row ${r} in house grid is not an array. Skipping.`);
                        continue; 
                    }
                    for (let c = 0; c < HOUSE_GRID_COLS; c++) {
                        const blockType = currentHouseGrid[r][c]; // 'wall', 'grass', or 0
                        
                        // Draw grid lines
                        houseCtx.strokeStyle = '#4a5568';
                        houseCtx.lineWidth = 0.5;
                        houseCtx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

                        if (blockType && blockTypes[blockType]) {
                            const img = preloadedBlockImages[blockType]; // Get preloaded image
                            if (img && img.complete) { // Check if image is loaded
                                houseCtx.drawImage(img, c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            } else {
                                // Fallback to color if image is not preloaded or failed to load
                                houseCtx.fillStyle = blockType === 'wall' ? '#757575' : '#4CAF50';
                                houseCtx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            }
                        } else {
                            // Default empty background
                            houseCtx.fillStyle = '#2d3748';
                            houseCtx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    }
                }

                // Draw placed furniture
                placedFurniture.forEach(item => {
                    const furnitureDef = furnitureItems.find(f => f.id === item.itemId);
                    if (furnitureDef) {
                        const img = preloadedFurnitureImages[item.itemId]; // Get preloaded image
                        if (img && img.complete) { // Check if image is loaded
                            if (furnitureDef.stretchable) {
                                const startX = Math.min(item.startCol, item.endCol) * BLOCK_SIZE;
                                const startY = Math.min(item.startRow, item.endRow) * BLOCK_SIZE;
                                const endX = Math.max(item.startCol, item.endCol) * BLOCK_SIZE + BLOCK_SIZE;
                                const endY = Math.max(item.startRow, item.endRow) * BLOCK_SIZE + BLOCK_SIZE;
                                houseCtx.drawImage(img, startX, startY, endX - startX, endY - startY);
                            } else {
                                houseCtx.drawImage(img, item.col * BLOCK_SIZE, item.row * BLOCK_SIZE, furnitureDef.widthBlocks * BLOCK_SIZE || BLOCK_SIZE, furnitureDef.heightBlocks * BLOCK_SIZE || BLOCK_SIZE);
                            }
                        } else {
                            // Fallback to color if image fails to load
                            console.error(`Failed to load image for ${furnitureDef.name}: ${furnitureDef.imageUrl}`);
                            if (furnitureDef.stretchable) {
                                const startX = Math.min(item.startCol, item.endCol) * BLOCK_SIZE;
                                const startY = Math.min(item.startRow, item.endRow) * BLOCK_SIZE;
                                const endX = Math.max(item.startCol, item.endCol) * BLOCK_SIZE + BLOCK_SIZE;
                                const endY = Math.max(item.startRow, item.endRow) * BLOCK_SIZE + BLOCK_SIZE;
                                houseCtx.fillStyle = '#8B4513'; // Fallback color for furniture
                                houseCtx.fillRect(startX, startY, endX - startX, endY - startY);
                            } else {
                                houseCtx.fillStyle = '#8B4513'; // Fallback color for wooden furniture
                                houseCtx.fillRect(item.col * BLOCK_SIZE, item.row * BLOCK_SIZE, furnitureDef.widthBlocks * BLOCK_SIZE || BLOCK_SIZE, furnitureDef.heightBlocks * BLOCK_SIZE || BLOCK_SIZE);
                            }
                        }
                    }
                });
            };

            const getGridCoords = (event) => {
                const rect = houseCanvas.getBoundingClientRect();
                const clientX = event.touches ? event.touches[0].clientX : event.clientX;
                const clientY = event.touches ? event.touches[0].clientY : event.clientY;

                const x = clientX - rect.left;
                const y = clientY - rect.top;

                const gridX = Math.floor(x / BLOCK_SIZE);
                const gridY = Math.floor(y / BLOCK_SIZE);
                return { gridY, gridX };
            };

            // Function to open the chest modal and populate it with axes
            const openChestModal = (chestFurnitureItem) => {
                chestAxeList.innerHTML = ''; // Clear previous content
                const currentHouse = currentInventory.houses[currentHouseIndex];
                const chestAxes = currentHouse.chestAxes || [];

                // Display axes currently in the chest
                if (chestAxes.length > 0) {
                    chestAxes.forEach(axeIndex => {
                        const axe = axes[axeIndex];
                        const axeElement = document.createElement('div');
                        axeElement.className = 'bg-gray-700 p-2 rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-colors';
                        axeElement.innerHTML = `
                            <img src="${axe.imageUrl}" alt="${axe.name}" class="w-12 h-12 mb-1">
                            <p class="text-sm text-white">${axe.name}</p>
                            <p class="text-xs text-stone-400">(In Chest)</p>
                        `;
                        axeElement.addEventListener('click', () => {
                            playSound(clickSound); // Play click sound
                            takeAxeFromChest(axeIndex);
                        });
                        axeElement.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                        chestAxeList.appendChild(axeElement);
                    });
                } else {
                    const noAxesMessage = document.createElement('p');
                    noAxesMessage.className = 'text-center text-stone-400 col-span-2';
                    noAxesMessage.textContent = 'No axes in the chest.';
                    chestAxeList.appendChild(noAxesMessage);
                }

                // Display axes currently in inventory (excluding equipped and basic axe)
                const inventoryAxes = currentInventory.ownedAxes.filter(axeIndex => 
                    axeIndex !== currentInventory.currentAxeIndex && axeIndex !== 0 // Exclude equipped and basic axe
                );

                if (inventoryAxes.length > 0) {
                    const inventoryHeader = document.createElement('p');
                    inventoryHeader.className = 'text-center text-lg font-bold text-blue-300 col-span-2 mt-4';
                    inventoryHeader.textContent = 'Your Inventory Axes:';
                    chestAxeList.appendChild(inventoryHeader);

                    inventoryAxes.forEach(axeIndex => {
                        const axe = axes[axeIndex];
                        const axeElement = document.createElement('div');
                        axeElement.className = 'bg-gray-700 p-2 rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition-colors';
                        axeElement.innerHTML = `
                            <img src="${axe.imageUrl}" alt="${axe.name}" class="w-12 h-12 mb-1">
                            <p class="text-sm text-white">${axe.name}</p>
                            <p class="text-xs text-stone-400">(In Inventory)</p>
                        `;
                        axeElement.addEventListener('click', () => {
                            playSound(clickSound); // Play click sound
                            putAxeInChest(axeIndex);
                        });
                        axeElement.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                        chestAxeList.appendChild(axeElement);
                    });
                } else if (chestAxes.length === 0) {
                    const noOtherAxesMessage = document.createElement('p');
                    noOtherAxesMessage.className = 'text-center text-stone-400 col-span-2 mt-2';
                    noOtherAxesMessage.textContent = 'No other axes in your inventory to store.';
                    chestAxeList.appendChild(noOtherAxesMessage);
                }

                chestModal.classList.add('show');
            };

            // Function to put an axe into the chest
            const putAxeInChest = (axeIndex) => {
                const currentHouse = currentInventory.houses[currentHouseIndex];
                const ownedAxeIndexInArray = currentInventory.ownedAxes.indexOf(axeIndex);

                if (ownedAxeIndexInArray !== -1) {
                    currentInventory.ownedAxes.splice(ownedAxeIndexInArray, 1); // Remove from inventory
                    currentHouse.chestAxes.push(axeIndex); // Add to chest
                    updateDisplays();
                    openChestModal(); // Re-render chest modal
                    showHouseMessage(`${axes[axeIndex].name} put into chest.`, 'green');
                }
            };

            // Function to take an axe from the chest
            const takeAxeFromChest = (axeIndex) => {
                const currentHouse = currentInventory.houses[currentHouseIndex];
                const chestAxeIndexInArray = currentHouse.chestAxes.indexOf(axeIndex);

                if (chestAxeIndexInArray !== -1) {
                    currentHouse.chestAxes.splice(chestAxeIndexInArray, 1); // Remove from chest
                    currentInventory.ownedAxes.push(axeIndex); // Add to inventory
                    
                    // If no axe is currently equipped, equip this one
                    if (currentInventory.currentAxeIndex === -1 || !currentInventory.ownedAxes.includes(currentInventory.currentAxeIndex)) {
                        currentInventory.currentAxeIndex = axeIndex;
                    }
                    updateDisplays();
                    openChestModal(); // Re-render chest modal
                    showHouseMessage(`${axes[axeIndex].name} taken from chest.`, 'green');
                }
            };

            let longPressTimer;
            const LONG_PRESS_THRESHOLD = 500; // milliseconds

            // New: Function to handle object removal at a specific grid coordinate
            const removeObjectAtGrid = (gridY, gridX) => {
                const currentHouse = currentInventory.houses[currentHouseIndex];
                let removed = false;

                // First, try to remove a placed furniture item
                for (let i = currentHouse.placedFurniture.length - 1; i >= 0; i--) {
                    const item = currentHouse.placedFurniture[i];
                    const furnitureDef = furnitureItems.find(f => f.id === item.itemId);

                    if (furnitureDef) {
                        let hit = false;
                        if (furnitureDef.stretchable) {
                            const minRow = Math.min(item.startRow, item.endRow);
                            const maxRow = Math.max(item.startRow, item.endRow);
                            const minCol = Math.min(item.startCol, item.endCol);
                            const maxCol = Math.max(item.startCol, item.endCol);
                            if (gridY >= minRow && gridY <= maxRow && gridX >= minCol && gridX <= maxCol) {
                                hit = true;
                            }
                        } else {
                            const itemWidth = furnitureDef.widthBlocks || 1;
                            const itemHeight = furnitureDef.heightBlocks || 1;
                            if (gridY >= item.row && gridY < item.row + itemHeight &&
                                gridX >= item.col && gridX < item.col + itemWidth) {
                                hit = true;
                            }
                        }

                        if (hit) {
                            currentHouse.placedFurniture.splice(i, 1); // Remove from placed
                            currentInventory.ownedFurniture[item.itemId] = (currentInventory.ownedFurniture[item.itemId] || 0) + 1; // Increment owned
                            removed = true;
                            showHouseMessage(`Removed ${furnitureDef.name}!`, 'green');
                            break; // Only remove one item per click/interval tick
                        }
                    }
                }

                // If no furniture was removed, try to remove a block
                if (!removed && currentHouse.grid[gridY][gridX] !== 0) {
                    const removedBlockType = currentHouse.grid[gridY][gridX];
                    currentHouse.grid[gridY][gridX] = 0; // Set back to empty
                    // Optionally refund cost if desired, but user didn't specify. For now, no refund.
                    removed = true;
                    showHouseMessage(`Removed ${blockTypes[removedBlockType].name} block!`, 'green');
                }
                
                if (removed) {
                    updateDisplays();
                    drawHouseGrid();
                } else {
                    // Only show "No object found" if it's a single click, not during turbo-delete
                    if (!isRemoving) {
                        showHouseMessage('No object found at this location.', 'red');
                    }
                }
            };

            const handleCanvasMouseDown = (event) => {
                const { gridY, gridX } = getGridCoords(event);
                const currentHouse = currentInventory.houses[currentHouseIndex];

                // Check for chest interaction (right-click or long-press)
                if (event.button === 2 || event.type === 'touchstart') { // Right-click or touchstart
                    const clickedFurniture = currentHouse.placedFurniture.find(item => {
                        const furnitureDef = furnitureItems.find(f => f.id === item.itemId);
                        if (!furnitureDef) return false;

                        if (furnitureDef.stretchable) {
                            const minRow = Math.min(item.startRow, item.endRow);
                            const maxRow = Math.max(item.startRow, item.endRow);
                            const minCol = Math.min(item.startCol, item.endCol);
                            const maxCol = Math.max(item.startCol, item.endCol);
                            return gridY >= minRow && gridY <= maxRow && gridX >= minCol && gridX <= maxCol && item.itemId === 'chest';
                        } else {
                            const itemWidth = furnitureDef.widthBlocks || 1;
                            const itemHeight = furnitureDef.heightBlocks || 1;
                            return gridY >= item.row && gridY < item.row + itemHeight &&
                                   gridX >= item.col && gridX < item.col + itemWidth && item.itemId === 'chest';
                        }
                    });

                    if (clickedFurniture && clickedFurniture.itemId === 'chest') {
                        event.preventDefault(); // Prevent context menu on right-click
                        if (event.type === 'touchstart') {
                            longPressTimer = setTimeout(() => {
                                playSound(clickSound); // Play click sound
                                openChestModal(clickedFurniture);
                            }, LONG_PRESS_THRESHOLD);
                        } else {
                            playSound(clickSound); // Play click sound
                            openChestModal(clickedFurniture);
                        }
                        return; // Stop further processing for chest interaction
                    }
                }

                // Normal placement/removal logic
                if (currentHouseAction === 'blockPlace') {
                    const blockDef = blockTypes[currentBuildingBlockType];
                    if (blockDef && blockDef.stretchable) {
                        isDragging = true;
                        dragStartGrid = { row: gridY, col: gridX };
                        houseCanvas.addEventListener('mousemove', handleCanvasMouseMove);
                        houseCanvas.addEventListener('mouseup', handleCanvasMouseUp);
                        houseCanvas.addEventListener('touchmove', handleCanvasMouseMove);
                        houseCanvas.addEventListener('touchend', handleCanvasMouseUp);
                    } else {
                        // This path is technically not hit now as all blocks are stretchable
                        const blockCost = blockDef.cost;
                        if (currentInventory.widowCash >= blockCost) {
                            currentInventory.widowCash -= blockCost;
                            currentInventory.houses[currentHouseIndex].grid[gridY][gridX] = currentBuildingBlockType;
                            updateDisplays();
                            drawHouseGrid();
                            showHouseMessage(`Placed ${currentBuildingBlockType} block! Cost: ${blockCost} Widow Cash.`, 'green');
                        } else {
                            showHouseMessage(`Not enough Widow Cash to place a ${currentBuildingBlockType} block! (${blockCost} needed)`, 'red');
                        }
                    }
                } else if (currentHouseAction === 'furniturePlace' && selectedFurnitureItem) {
                    if ((currentInventory.ownedFurniture[selectedFurnitureItem.id] || 0) > 0) {
                        if (selectedFurnitureItem.stretchable) {
                            isDragging = true;
                            dragStartGrid = { row: gridY, col: gridX };
                            houseCanvas.addEventListener('mousemove', handleCanvasMouseMove);
                            houseCanvas.addEventListener('mouseup', handleCanvasMouseUp);
                            houseCanvas.addEventListener('touchmove', handleCanvasMouseMove);
                            houseCanvas.addEventListener('touchend', handleCanvasMouseUp);
                        } else {
                            // Place non-stretchable furniture
                            currentInventory.houses[currentHouseIndex].placedFurniture.push({
                                itemId: selectedFurnitureItem.id,
                                row: gridY,
                                col: gridX
                            });
                            currentInventory.ownedFurniture[selectedFurnitureItem.id]--; // Decrement quantity
                            updateDisplays();
                            drawHouseGrid();
                            showHouseMessage('Furniture placed!', 'green');
                        }
                    } else {
                        showHouseMessage(`You don't have any more ${selectedFurnitureItem.name} to place!`, 'red');
                    }
                } else if (currentHouseAction === 'remove') {
                    // Initial removal on mouse down
                    playSound(clickSound); // Play click sound on removal
                    removeObjectAtGrid(gridY, gridX);
                    isRemoving = true;
                    // Start turbo delete interval
                    removeIntervalRef = setInterval(() => {
                        removeObjectAtGrid(gridY, gridX);
                    }, 100); // Remove every 100ms
                }
            };

            const handleCanvasMouseMove = (event) => {
                if (!isDragging && !isRemoving) return; // Only draw preview if dragging or removing

                const { gridY, gridX } = getGridCoords(event);
                
                // Clear and redraw base grid and existing furniture
                drawHouseGrid(); 

                if (isDragging) { // Only show preview if dragging for placement
                    const startX = Math.min(dragStartGrid.col, gridX) * BLOCK_SIZE;
                    const startY = Math.min(dragStartGrid.row, gridY) * BLOCK_SIZE;
                    const endX = Math.max(dragStartGrid.col, gridX) * BLOCK_SIZE + BLOCK_SIZE;
                    const endY = Math.max(dragStartGrid.row, gridY) * BLOCK_SIZE + BLOCK_SIZE;

                    houseCtx.globalAlpha = 0.5; // Semi-transparent for preview

                    if (currentHouseAction === 'blockPlace') {
                        const blockDef = blockTypes[currentBuildingBlockType];
                        if (blockDef) {
                            const img = preloadedBlockImages[currentBuildingBlockType]; // Get preloaded image
                            if (img && img.complete) {
                                houseCtx.drawImage(img, startX, startY, endX - startX, endY - startY);
                            } else {
                                houseCtx.fillStyle = blockDef.name === 'Wall Block' ? '#757575' : '#4CAF50';
                                houseCtx.fillRect(startX, startY, endX - startX, endY - startY);
                            }
                        }
                    } else if (currentHouseAction === 'furniturePlace' && selectedFurnitureItem && selectedFurnitureItem.stretchable) {
                        const img = preloadedFurnitureImages[selectedFurnitureItem.id]; // Get preloaded image
                        if (img && img.complete) {
                            houseCtx.drawImage(img, startX, startY, endX - startX, endY - startY);
                        } else {
                            houseCtx.fillStyle = '#8B4513'; // Fallback color for furniture
                            houseCtx.fillRect(startX, startY, endX - startX, endY - startY);
                        }
                    }
                    
                    houseCtx.globalAlpha = 1.0; // Reset alpha
                    houseCtx.strokeStyle = '#FFFFFF'; // White border for preview
                    houseCtx.lineWidth = 1;
                    houseCtx.strokeRect(startX, startY, endX - startX, endY - startY);
                }
            };

            const handleCanvasMouseUp = (event) => {
                if (longPressTimer) { // Clear long press timer if it was a short press
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }

                if (isRemoving) { // Stop turbo delete
                    clearInterval(removeIntervalRef);
                    isRemoving = false;
                    removeIntervalRef = null;
                    return; // Do not proceed with placement logic if in removal mode
                }

                if (!isDragging) return;

                const { gridY, gridX } = getGridCoords(event);
                const currentHouse = currentInventory.houses[currentHouseIndex];

                const minRow = Math.min(dragStartGrid.row, gridY);
                const maxRow = Math.max(dragStartGrid.row, gridY);
                const minCol = Math.min(dragStartGrid.col, gridX);
                const maxCol = Math.max(dragStartGrid.col, gridX);

                if (currentHouseAction === 'blockPlace') {
                    const blockDef = blockTypes[currentBuildingBlockType];
                    if (!blockDef) {
                        showHouseMessage('Invalid block type selected.', 'red');
                        return;
                    }
                    const blockCost = blockDef.cost;
                    let blocksPlaced = 0;
                    let costIncurred = 0;
                    let canAffordAll = true;

                    // First, check if user can afford all blocks in the dragged area
                    const requiredCash = (maxRow - minRow + 1) * (maxCol - minCol + 1) * blockCost;
                    if (currentInventory.widowCash < requiredCash) {
                        showHouseMessage(`Not enough Widow Cash to place all blocks! Needed: ${requiredCash}`, 'red');
                        canAffordAll = false;
                    }

                    if (canAffordAll) {
                        for (let r = minRow; r <= maxRow; r++) {
                            for (let c = minCol; c <= maxCol; c++) {
                                if (r >= 0 && r < HOUSE_GRID_ROWS && c >= 0 && c < HOUSE_GRID_COLS) {
                                    currentHouse.grid[r][c] = currentBuildingBlockType;
                                    blocksPlaced++;
                                    costIncurred += blockCost;
                                }
                            }
                        }
                        currentInventory.widowCash -= costIncurred;
                        showHouseMessage(`Placed ${blocksPlaced} ${blockDef.name} blocks! Total Cost: ${costIncurred} Widow Cash.`, 'green');
                    }
                } else if (currentHouseAction === 'furniturePlace' && selectedFurnitureItem && selectedFurnitureItem.stretchable) {
                    if ((currentInventory.ownedFurniture[selectedFurnitureItem.id] || 0) > 0) {
                        // Add the stretched furniture to inventory
                        currentInventory.houses[currentHouseIndex].placedFurniture.push({
                            itemId: selectedFurnitureItem.id,
                            startRow: dragStartGrid.row,
                            startCol: dragStartGrid.col,
                            endRow: gridY,
                            endCol: gridX
                        });
                        currentInventory.ownedFurniture[selectedFurnitureItem.id]--; // Decrement quantity
                        showHouseMessage('Furniture placed!', 'green');
                    } else {
                        showHouseMessage(`You don't have any more ${selectedFurnitureItem.name} to place!`, 'red');
                    }
                }
                
                isDragging = false;
                dragStartGrid = { row: -1, col: -1 };
                selectedFurnitureItem = null; // Deselect after placing
                updateDisplays();
                drawHouseGrid(); // Final redraw

                houseCanvas.removeEventListener('mousemove', handleCanvasMouseMove);
                houseCanvas.removeEventListener('mouseup', handleCanvasMouseUp);
                houseCanvas.removeEventListener('touchmove', handleCanvasMouseMove);
                houseCanvas.removeEventListener('touchend', handleCanvasMouseUp);
            };

            houseCanvas.addEventListener('mousedown', handleCanvasMouseDown);
            houseCanvas.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent scrolling/zooming
                handleCanvasMouseDown(e); // Pass the original event for touch detection
            }, { passive: false }); // Use passive: false to allow preventDefault

            houseCanvas.addEventListener('mouseup', handleCanvasMouseUp);
            houseCanvas.addEventListener('touchend', (e) => {
                // Clear long press timer on touch end
                if (longPressTimer) {
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }
                handleCanvasMouseUp(e);
            });
            houseCanvas.addEventListener('contextmenu', (e) => e.preventDefault()); // Prevent default right-click menu

            // Function to render block selection tools - UPDATED
            const renderBlockSelection = () => {
                buildingToolsDiv.innerHTML = `
                    <button id="selectWallBlockButton" class="house-block-button ${currentBuildingBlockType === 'wall' ? 'active' : ''}">
                        <img src="${blockTypes.wall.imageUrl}" alt="Wall Block" class="inline-block w-6 h-6 mr-2 vertical-align-middle"/>
                        Wall Block (${blockTypes.wall.cost} Cash)
                    </button>
                    <button id="selectGrassBlockButton" class="house-block-button ${currentBuildingBlockType === 'grass' ? 'active' : ''}">
                        <img src="${blockTypes.grass.imageUrl}" alt="Grass Block" class="inline-block w-6 h-6 mr-2 vertical-align-middle"/>
                        Grass Block (${blockTypes.grass.cost} Cash)
                    </button>
                `;

                const selectWallBlockButton = buildingToolsDiv.querySelector('#selectWallBlockButton');
                const selectGrassBlockButton = buildingToolsDiv.querySelector('#selectGrassBlockButton');

                if (selectWallBlockButton) {
                    selectWallBlockButton.addEventListener('click', () => {
                        playSound(clickSound); // Play click sound
                        currentBuildingBlockType = 'wall';
                        selectWallBlockButton.classList.add('active');
                        selectGrassBlockButton.classList.remove('active');
                        showHouseMessage('Selected: Wall Block', 'blue');
                    });
                    selectWallBlockButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                }
                if (selectGrassBlockButton) {
                    selectGrassBlockButton.addEventListener('click', () => {
                        playSound(clickSound); // Play click sound
                        currentBuildingBlockType = 'grass';
                        selectGrassBlockButton.classList.add('active');
                        selectWallBlockButton.classList.remove('active');
                        showHouseMessage('Selected: Grass Block', 'green');
                    });
                    selectGrassBlockButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                }
            };

            // Function to render furniture selection tools - UPDATED
            const renderFurnitureSelection = () => {
                let furnitureSelectionHtml = '';
                const ownedFurnitureKeys = Object.keys(currentInventory.ownedFurniture);

                if (ownedFurnitureKeys.length === 0 || ownedFurnitureKeys.every(key => currentInventory.ownedFurniture[key] === 0)) {
                    furnitureSelectionHtml = `<p class="text-stone-400">You don't own any furniture yet. Buy some from the shop!</p>`;
                } else {
                    ownedFurnitureKeys.forEach(itemId => {
                        const item = furnitureItems.find(f => f.id === itemId);
                        const ownedQuantity = currentInventory.ownedFurniture[itemId] || 0;
                        if (item && ownedQuantity > 0) { // Only show if owned and quantity > 0
                            furnitureSelectionHtml += `
                                <button class="house-furniture-button ${selectedFurnitureItem && selectedFurnitureItem.id === item.id ? 'active' : ''}" data-item-id="${item.id}">
                                    <img src="${item.imageUrl}" alt="${item.name}" class="inline-block w-6 h-6 mr-2 vertical-align-middle"/>
                                    ${item.name} (${ownedQuantity})
                                </button>
                            `;
                        }
                    });
                }
                buildingToolsDiv.innerHTML = furnitureSelectionHtml;

                buildingToolsDiv.querySelectorAll('.house-furniture-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        playSound(clickSound); // Play click sound
                        const itemId = event.target.closest('button').dataset.itemId;
                        selectedFurnitureItem = furnitureItems.find(f => f.id === itemId);
                        // Remove active class from all furniture buttons
                        buildingToolsDiv.querySelectorAll('.house-furniture-button').forEach(btn => btn.classList.remove('active'));
                        // Add active class to the clicked button
                        event.target.closest('button').classList.add('active');
                        showHouseMessage(`Selected: ${selectedFurnitureItem.name}`, 'blue');
                    });
                    button.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound
                });
            };

            // Initial render of building tools based on current mode, only if buttons are visible
            if (isBuildingModeButtonsVisible) {
                if (currentHouseAction === 'blockPlace') {
                    renderBlockSelection();
                } else if (currentHouseAction === 'furniturePlace') {
                    renderFurnitureSelection();
                } else { // 'remove' mode
                    buildingToolsDiv.innerHTML = `<p class="text-stone-400">Click on an object in your house to remove it.</p>`;
                }
            } else {
                buildingToolsDiv.innerHTML = ''; // Clear tools if buttons are hidden
            }


            // Event listeners for mode switching buttons
            selectBlockModeButton.addEventListener('click', () => {
                playSound(clickSound); // Play click sound
                currentHouseAction = 'blockPlace';
                selectedFurnitureItem = null; // Clear selected furniture
                currentBuildingBlockType = 'wall'; // Reset to default block type
                selectBlockModeButton.classList.add('active');
                selectFurnitureModeButton.classList.remove('active');
                removeObjectButton.classList.remove('active');
                renderBlockSelection();
                showHouseMessage('Switched to Block Placement Mode', 'blue');
            });
            selectBlockModeButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

            selectFurnitureModeButton.addEventListener('click', () => {
                playSound(clickSound); // Play click sound
                currentHouseAction = 'furniturePlace';
                currentBuildingBlockType = null; // Clear selected block
                selectedFurnitureItem = null; // Clear previously selected furniture to avoid accidental placement
                selectFurnitureModeButton.classList.add('active');
                selectBlockModeButton.classList.remove('active');
                removeObjectButton.classList.remove('active');
                renderFurnitureSelection();
                showHouseMessage('Switched to Furniture Placement Mode', 'blue');
            });
            selectFurnitureModeButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

            removeObjectButton.addEventListener('click', () => {
                playSound(clickSound); // Play click sound
                currentHouseAction = 'remove';
                selectedFurnitureItem = null; // Clear selected furniture
                currentBuildingBlockType = null; // Clear selected block
                removeObjectButton.classList.add('active');
                selectBlockModeButton.classList.remove('active');
                selectFurnitureModeButton.classList.remove('active');
                buildingToolsDiv.innerHTML = `<p class="text-stone-400">Click on an object in your house to remove it.</p>`;
                showHouseMessage('Switched to Remove Object Mode', 'red');
            });
            removeObjectButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound


            // Initial draw
            drawHouseGrid();
        }

        const showHouseMessage = (message, type) => {
            const houseMessageDiv = document.getElementById('houseMessage');
            if (houseMessageDiv) {
                houseMessageDiv.textContent = message;
                houseMessageDiv.className = `text-red-400 mt-4`; // Reset class
                if (type === 'green') {
                    houseMessageDiv.classList.add('text-green-400');
                } else if (type === 'blue') {
                    houseMessageDiv.classList.add('text-blue-400');
                } else {
                    houseMessageDiv.classList.add('text-red-400');
                }
                houseMessageDiv.classList.remove('hidden');
                setTimeout(() => houseMessageDiv.classList.add('hidden'), 3000);
            }
        };

        return houseDiv;
    };

    // --- Main Render Function for New City ---
    const renderApp = () => {
        // Clear existing content in the dynamic area
        dynamicContentArea.innerHTML = '';

        // Removed currentActiveQuest checks from navigation button disabling logic
        widowTreesNavButton.classList.remove('active');
        lumbermillNavButton.classList.remove('active');
        shopNavButton.classList.remove('active'); 
        questsNavButton.classList.remove('active'); 
        houseNavButton.classList.remove('active'); 
        teleportNavButton.classList.remove('active'); 

        // Render content based on currentView
        if (currentView === 'widowTrees') {
            dynamicContentArea.appendChild(renderWidowTreesView());
            widowTreesNavButton.classList.add('active');
        } else if (currentView === 'lumbermill') {
            dynamicContentArea.appendChild(renderLumbermillView());
            lumbermillNavButton.classList.add('active');
        } else if (currentView === 'shop') { 
            dynamicContentArea.appendChild(renderShopView());
            shopNavButton.classList.add('active');
        } else if (currentView === 'quests') { 
            dynamicContentArea.appendChild(renderQuestsView());
            questsNavButton.classList.add('active');
        } else if (currentView === 'house') { 
            dynamicContentArea.appendChild(renderHouseView());
            houseNavButton.classList.add('active');
        }
        // No content to render for 'teleport' view, as it's a modal
        updateDisplays(); // Ensure displays are updated after rendering
    };

    // Event listeners for navigation buttons
    widowTreesNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'widowTrees';
        // Clear any ongoing activities if switching views
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        // Do not clear quest state when switching views, only when completed
        teleportModal.classList.remove('show'); // Hide modal if open
        renderApp();
    });
    widowTreesNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    lumbermillNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'lumbermill';
        // Clear any ongoing activities if switching views
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        // Do not clear quest state when switching views
        teleportModal.classList.remove('show'); // Hide modal if open
        renderApp();
    });
    lumbermillNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // New: Event listener for Shop button
    shopNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'shop';
        // Clear any ongoing activities if switching views
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        // Do not clear quest state when switching views
        teleportModal.classList.remove('show'); // Hide modal if open
        renderApp();
    });
    shopNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // New: Event listener for Quests button
    questsNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'quests';
        // Clear any ongoing activities if switching views
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        teleportModal.classList.remove('show'); // Hide modal if open
        renderApp();
    });
    questsNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // New: Event listener for House button
    houseNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'house';
        // Clear any ongoing activities if switching views
        isDragging = false; // Reset dragging state for house
        dragStartGrid = { row: -1, col: -1 };
        selectedFurnitureItem = null; // Reset selected furniture
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        teleportModal.classList.remove('show'); // Hide modal if open
        renderApp();
    });
    houseNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // New: Event listener for Teleport button
    teleportNavButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        currentView = 'teleport'; // Set view to teleport (no content rendered, just modal)
        // Clear any ongoing activities if switching views
        if (choppingIntervalRef) clearInterval(choppingIntervalRef);
        isChoppingWidowLumber = false;
        isSellingAnyItem = false; 
        // Do not clear quest state when switching views
        
        teleportModal.classList.add('show'); // Show the teleport modal
        teleportNavButton.classList.add('active'); // Mark teleport button as active
        updateDisplays(); // Ensure displays are updated
        dynamicContentArea.innerHTML = ''; // Clear main content area
    });
    teleportNavButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // New: Event listener for closing the teleport modal
    closeTeleportModalButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        teleportModal.classList.remove('show');
        // Revert to the default view or previous view after closing modal
        currentView = 'widowTrees';
        renderApp();
    });
    closeTeleportModalButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // Handle the start button click
    startButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        startScreen.classList.add('hidden'); // Hide the start screen
        mainGameContainer.classList.remove('hidden'); // Show the main game content
        backgroundMusic.play().catch(error => {
            console.error("Autoplay prevented:", error);
            // Optionally, show a message to the user that music couldn't play
        });
        renderApp(); // Initial render of the game content
        // Removed startRandomQuest() from here. Quests will now be started manually.
    });
    startButton.addEventListener('mouseover', () => playSound(hoverSound)); // Add hover sound

    // Hide loading screen and show start screen once all assets are loaded
    window.onload = () => {
        preloadBlockImages(); // Preload block images on window load
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            startScreen.classList.remove('hidden'); // Show the start screen
        }, 500); // Give a small delay for the fade-out effect
    };

    // Prevent double-tap zoom on iOS and other mobile browsers
    document.documentElement.addEventListener('dblclick', (e) => {
        e.preventDefault();
    }, { passive: false });
}); // End DOMContentLoaded
