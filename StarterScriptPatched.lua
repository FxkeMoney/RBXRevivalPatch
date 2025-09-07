--[[ Injected ExecutorGui ]]--
pcall(function()
  local Players = game:GetService("Players")
  local player = Players.LocalPlayer
  local playerGui = player:WaitForChild("PlayerGui")

  local screenGui = Instance.new("ScreenGui")
  screenGui.Name = "ExecutorGui"
  screenGui.ResetOnSpawn = false
  screenGui.Parent = playerGui

  local frame = Instance.new("Frame")
  frame.Size = UDim2.new(0, 400, 0, 200)
  frame.Position = UDim2.new(0.5, -200, 0.5, -100)
  frame.BackgroundColor3 = Color3.fromRGB(30,30,30)
  frame.Parent = screenGui

  local box = Instance.new("TextBox")
  box.Size = UDim2.new(1, -10, 1, -50)
  box.Position = UDim2.new(0, 5, 0, 5)
  box.ClearTextOnFocus = false
  box.TextWrapped = true
  box.TextXAlignment = Enum.TextXAlignment.Left
  box.TextYAlignment = Enum.TextYAlignment.Top
  box.Text = "-- Type Lua here"
  box.Parent = frame

  local runBtn = Instance.new("TextButton")
  runBtn.Size = UDim2.new(0, 100, 0, 30)
  runBtn.Position = UDim2.new(1, -105, 1, -35)
  runBtn.Text = "Run"
  runBtn.Parent = frame

  runBtn.MouseButton1Click:Connect(function()
    local code = box.Text
    local ok, fn = pcall(loadstring or load, code)
    if ok and type(fn) == "function" then
      local success, result = pcall(fn)
      if not success then warn("Runtime error:", result) end
    else
      warn("Compile error:", fn)
    end
  end)

  print("[ExecutorGui] ready")
end)

--[[ End of ExecutorGui ]]--
-- Creates all neccessary scripts for the gui on initial load, everything except build tools
-- Created by Ben T. 10/29/10
-- Please note that these are loaded in a specific order to diminish errors/perceived load time by user

local scriptContext = game:GetService("ScriptContext")
local touchEnabled = game:GetService("UserInputService").TouchEnabled

local RobloxGui = game:GetService("CoreGui"):WaitForChild("RobloxGui")

local soundFolder = Instance.new("Folder")
soundFolder.Name = "Sounds"
soundFolder.Parent = RobloxGui

-- TopBar
local topbarSuccess, topbarFlagValue = pcall(function() return settings():GetFFlag("UseInGameTopBar") end)
local useTopBar = (topbarSuccess and topbarFlagValue == true)
if useTopBar then
	scriptContext:AddCoreScriptLocal("CoreScripts/Topbar", RobloxGui)
end

-- SettingsScript
local luaControlsSuccess, luaControlsFlagValue = pcall(function() return settings():GetFFlag("UseLuaCameraAndControl") end)

-- MainBotChatScript (the Lua part of Dialogs)
scriptContext:AddCoreScriptLocal("CoreScripts/MainBotChatScript2", RobloxGui)

-- Developer Console Script
scriptContext:AddCoreScriptLocal("CoreScripts/DeveloperConsole", RobloxGui)

-- In-game notifications script
scriptContext:AddCoreScriptLocal("CoreScripts/NotificationScript2", RobloxGui)

-- Chat script
if useTopBar then
	spawn(function() require(RobloxGui.Modules.Chat) end)
	spawn(function() require(RobloxGui.Modules.PlayerlistModule) end)
end

local luaBubbleChatSuccess, luaBubbleChatFlagValue = pcall(function() return settings():GetFFlag("LuaBasedBubbleChat") end)
if luaBubbleChatSuccess and luaBubbleChatFlagValue then
	scriptContext:AddCoreScriptLocal("CoreScripts/BubbleChat", RobloxGui)
end

-- Purchase Prompt Script
scriptContext:AddCoreScriptLocal("CoreScripts/PurchasePromptScript2", RobloxGui)

-- Health Script
if not useTopBar then
	scriptContext:AddCoreScriptLocal("CoreScripts/HealthScript", RobloxGui)
end

do -- Backpack!
	spawn(function() require(RobloxGui.Modules.BackpackScript) end)
end

if useTopBar then
	scriptContext:AddCoreScriptLocal("CoreScripts/VehicleHud", RobloxGui)
end

scriptContext:AddCoreScriptLocal("CoreScripts/GamepadMenu", RobloxGui)

if touchEnabled then -- touch devices don't use same control frame
	-- only used for touch device button generation
	scriptContext:AddCoreScriptLocal("CoreScripts/ContextActionTouch", RobloxGui)

	RobloxGui:WaitForChild("ControlFrame")
	RobloxGui.ControlFrame:WaitForChild("BottomLeftControl")
	RobloxGui.ControlFrame.BottomLeftControl.Visible = false
end
