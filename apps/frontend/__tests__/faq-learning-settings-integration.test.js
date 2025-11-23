"use strict";
/**
 * FAQ Learning Settings Frontend Integration Tests
 * Tests the complete frontend integration for FAQ learning settings
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const globals_1 = require("@jest/globals");
const page_1 = __importDefault(require("../src/app/admin/support/faq-learning/settings/page"));
// Mock the service
const mockFaqLearningService = {
    getConfig: globals_1.jest.fn(),
    getAiProviderInfo: globals_1.jest.fn(),
    bulkUpdateConfig: globals_1.jest.fn(),
    resetConfigSection: globals_1.jest.fn(),
};
// Mock the toast hook
const mockToast = globals_1.jest.fn();
globals_1.jest.mock('@/hooks/use-toast', () => ({
    useToast: () => ({ toast: mockToast }),
}));
// Mock the service import
globals_1.jest.mock('@/services/faq-learning.service', () => ({
    FaqLearningService: mockFaqLearningService,
}));
// Mock UI components that might cause issues in tests
globals_1.jest.mock('@/components/ui/tabs', () => ({
    Tabs: ({ children, value, onValueChange }) => (<div data-testid="tabs" data-value={value}>
      {children}
    </div>),
    TabsList: ({ children }) => <div data-testid="tabs-list">{children}</div>,
    TabsTrigger: ({ children, value, onClick }) => (<button data-testid={`tab-${value}`} onClick={() => onClick?.(value)}>
      {children}
    </button>),
    TabsContent: ({ children, value }) => (<div data-testid={`tab-content-${value}`}>{children}</div>),
}));
describe('FAQ Learning Settings Integration', () => {
    const mockConfigData = {
        configurations: [
            {
                key: 'minConfidenceForReview',
                value: 60,
                description: 'Minimum confidence score for review',
                category: 'thresholds',
                type: 'range',
                min: 0,
                max: 100,
                step: 1,
                unit: '%',
                isActive: true,
                updatedAt: new Date(),
            },
            {
                key: 'enableRealTimeProcessing',
                value: false,
                description: 'Enable real-time processing',
                category: 'processing',
                type: 'boolean',
                isActive: true,
                updatedAt: new Date(),
            },
            {
                key: 'temperature',
                value: 0.7,
                description: 'AI model creativity level',
                category: 'ai',
                type: 'range',
                min: 0,
                max: 2,
                step: 0.1,
                isActive: true,
                updatedAt: new Date(),
            },
            {
                key: 'excludedCategories',
                value: [],
                description: 'Categories to exclude',
                category: 'categories',
                type: 'multiselect',
                options: [
                    { value: 'spam', label: 'Spam' },
                    { value: 'test', label: 'Test' },
                ],
                isActive: true,
                updatedAt: new Date(),
            },
        ],
    };
    const mockAiProviderInfo = {
        currentProvider: 'openai',
        currentModel: 'gpt-4',
        available: true,
        isReadOnly: true,
        globalSettingsUrl: '/admin/profile/ai-preferences',
    };
    beforeEach(() => {
        globals_1.jest.clearAllMocks();
        mockFaqLearningService.getConfig.mockResolvedValue(mockConfigData);
        mockFaqLearningService.getAiProviderInfo.mockResolvedValue(mockAiProviderInfo);
        mockFaqLearningService.bulkUpdateConfig.mockResolvedValue({
            success: true,
            message: 'Configurations updated successfully',
            results: mockConfigData.configurations.map(c => ({
                configKey: c.key,
                success: true,
            })),
        });
        mockFaqLearningService.resetConfigSection.mockResolvedValue({
            success: true,
            message: 'Section reset successfully',
            resetConfigs: [],
        });
    });
    describe('Initial Load and Data Display', () => {
        it('should load and display all configuration settings correctly', async () => {
            (0, react_2.render)(<page_1.default />);
            // Wait for loading to complete
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Verify API calls were made
            expect(mockFaqLearningService.getConfig).toHaveBeenCalledTimes(1);
            expect(mockFaqLearningService.getAiProviderInfo).toHaveBeenCalledTimes(1);
            // Verify page title
            expect(react_2.screen.getByText('FAQ Learning Ayarları')).toBeInTheDocument();
            // Verify tabs are rendered
            expect(react_2.screen.getByTestId('tabs')).toBeInTheDocument();
            expect(react_2.screen.getByTestId('tabs-list')).toBeInTheDocument();
        });
        it('should display AI provider information correctly', async () => {
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Check AI provider info is displayed
            expect(react_2.screen.getByText('OPENAI')).toBeInTheDocument();
            expect(react_2.screen.getByText('gpt-4')).toBeInTheDocument();
        });
        it('should handle loading states properly', async () => {
            // Mock delayed response
            mockFaqLearningService.getConfig.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockConfigData), 100)));
            (0, react_2.render)(<page_1.default />);
            // Should show loading state initially
            expect(react_2.screen.getByText(/animate-pulse/)).toBeInTheDocument();
            // Wait for loading to complete
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/animate-pulse/)).not.toBeInTheDocument();
            }, { timeout: 200 });
        });
        it('should handle API errors gracefully', async () => {
            mockFaqLearningService.getConfig.mockRejectedValue(new Error('API Error'));
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    title: 'Hata',
                    description: 'Ayarlar yüklenemedi. Lütfen daha sonra tekrar deneyin.',
                    variant: 'destructive',
                });
            });
            // Should show empty state
            expect(react_2.screen.getByText('Ayar Bulunamadı')).toBeInTheDocument();
        });
    });
    describe('Setting Input Components', () => {
        it('should render different input types correctly', async () => {
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Range input (slider)
            const confidenceSlider = react_2.screen.getByRole('slider');
            expect(confidenceSlider).toBeInTheDocument();
            expect(confidenceSlider).toHaveAttribute('min', '0');
            expect(confidenceSlider).toHaveAttribute('max', '100');
            // Boolean input (switch)
            const realtimeSwitch = react_2.screen.getByRole('switch');
            expect(realtimeSwitch).toBeInTheDocument();
            expect(realtimeSwitch).not.toBeChecked();
            // Multiselect input
            const categorySelect = react_2.screen.getByText('Kategori seçin...');
            expect(categorySelect).toBeInTheDocument();
        });
        it('should update setting values when inputs change', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Change boolean setting
            const realtimeSwitch = react_2.screen.getByRole('switch');
            await user.click(realtimeSwitch);
            // Should show change indicator
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
            });
            // Should enable save button
            const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
            expect(saveButton).not.toBeDisabled();
        });
        it('should validate input values and show errors', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Find a number input and enter invalid value
            const numberInput = react_2.screen.getByDisplayValue('60');
            await user.clear(numberInput);
            await user.type(numberInput, '150'); // Above max of 100
            // Should show validation error
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText(/en fazla 100 olmalıdır/)).toBeInTheDocument();
            });
            // Save button should be disabled
            const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
            expect(saveButton).toBeDisabled();
        });
    });
    describe('Save Functionality', () => {
        it('should save all changes successfully', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Make a change
            const realtimeSwitch = react_2.screen.getByRole('switch');
            await user.click(realtimeSwitch);
            // Wait for change to be tracked
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
            });
            // Click save
            const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
            await user.click(saveButton);
            // Should show loading state
            expect(react_2.screen.getByText(/Kaydediliyor.../)).toBeInTheDocument();
            // Wait for save to complete
            await (0, react_2.waitFor)(() => {
                expect(mockFaqLearningService.bulkUpdateConfig).toHaveBeenCalledWith([
                    {
                        configKey: 'minConfidenceForReview',
                        configValue: 60,
                        description: 'Minimum confidence score for review',
                        category: 'thresholds',
                    },
                    {
                        configKey: 'enableRealTimeProcessing',
                        configValue: true, // Changed value
                        description: 'Enable real-time processing',
                        category: 'processing',
                    },
                    {
                        configKey: 'temperature',
                        configValue: 0.7,
                        description: 'AI model creativity level',
                        category: 'ai',
                    },
                    {
                        configKey: 'excludedCategories',
                        configValue: [],
                        description: 'Categories to exclude',
                        category: 'categories',
                    },
                ]);
            });
            // Should show success message
            expect(mockToast).toHaveBeenCalledWith({
                title: 'Başarılı',
                description: expect.stringContaining('ayar başarıyla kaydedildi'),
                variant: 'default',
            });
            // Should clear change indicators
            expect(react_2.screen.queryByText('1 değişiklik')).not.toBeInTheDocument();
        });
        it('should handle save errors gracefully', async () => {
            const user = user_event_1.default.setup();
            mockFaqLearningService.bulkUpdateConfig.mockRejectedValue(new Error('Save failed'));
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Make a change and save
            const realtimeSwitch = react_2.screen.getByRole('switch');
            await user.click(realtimeSwitch);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
            });
            const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
            await user.click(saveButton);
            // Should show error message
            await (0, react_2.waitFor)(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    title: 'Kaydetme Hatası',
                    description: 'Save failed',
                    variant: 'destructive',
                });
            });
        });
        it('should handle partial save success', async () => {
            const user = user_event_1.default.setup();
            mockFaqLearningService.bulkUpdateConfig.mockResolvedValue({
                success: false,
                message: 'Partial success',
                results: [
                    { configKey: 'minConfidenceForReview', success: true },
                    { configKey: 'enableRealTimeProcessing', success: false, error: 'Validation failed' },
                ],
            });
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Make changes and save
            const realtimeSwitch = react_2.screen.getByRole('switch');
            await user.click(realtimeSwitch);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
            });
            const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
            await user.click(saveButton);
            // Should show partial success message
            await (0, react_2.waitFor)(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    title: 'Kısmi Başarı',
                    description: expect.stringContaining('1 ayar kaydedildi, 1 ayar başarısız oldu'),
                    variant: 'destructive',
                });
            });
        });
    });
    describe('Reset Functionality', () => {
        it('should reset category to defaults successfully', async () => {
            const user = user_event_1.default.setup();
            // Mock window.confirm
            const confirmSpy = globals_1.jest.spyOn(window, 'confirm').mockReturnValue(true);
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Find and click reset button for a category
            const resetButton = react_2.screen.getByText(/Varsayılana Dön/);
            await user.click(resetButton);
            // Should show confirmation dialog
            expect(confirmSpy).toHaveBeenCalled();
            // Should call reset API
            await (0, react_2.waitFor)(() => {
                expect(mockFaqLearningService.resetConfigSection).toHaveBeenCalledWith('thresholds');
            });
            // Should show success message
            expect(mockToast).toHaveBeenCalledWith({
                title: 'Başarılı',
                description: expect.stringContaining('varsayılan değerlere sıfırlandı'),
                variant: 'default',
            });
            confirmSpy.mockRestore();
        });
        it('should cancel reset when user declines confirmation', async () => {
            const user = user_event_1.default.setup();
            // Mock window.confirm to return false
            const confirmSpy = globals_1.jest.spyOn(window, 'confirm').mockReturnValue(false);
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            const resetButton = react_2.screen.getByText(/Varsayılana Dön/);
            await user.click(resetButton);
            // Should not call reset API
            expect(mockFaqLearningService.resetConfigSection).not.toHaveBeenCalled();
            confirmSpy.mockRestore();
        });
        it('should handle reset errors gracefully', async () => {
            const user = user_event_1.default.setup();
            const confirmSpy = globals_1.jest.spyOn(window, 'confirm').mockReturnValue(true);
            mockFaqLearningService.resetConfigSection.mockRejectedValue(new Error('Reset failed'));
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            const resetButton = react_2.screen.getByText(/Varsayılana Dön/);
            await user.click(resetButton);
            // Should show error message
            await (0, react_2.waitFor)(() => {
                expect(mockToast).toHaveBeenCalledWith({
                    title: 'Sıfırlama Hatası',
                    description: expect.stringContaining('Reset failed'),
                    variant: 'destructive',
                });
            });
            confirmSpy.mockRestore();
        });
    });
    describe('Change Tracking and UX', () => {
        it('should track changes across different categories', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
            });
            // Make changes in different categories
            const realtimeSwitch = react_2.screen.getByRole('switch');
            await user.click(realtimeSwitch);
            const confidenceSlider = react_2.screen.getByRole('slider');
            react_2.fireEvent.change(confidenceSlider, { target: { value: '70' } });
            // Should track multiple changes
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.getByText('2 değişiklik')).toBeInTheDocument();
            });
            // Should show change indicators on tabs
            const processingTab = react_2.screen.getByTestId('tab-processing');
            expect(processingTab.querySelector('.animate-pulse')).toBeInTheDocument();
        });
        it('should warn about unsaved changes before navigation', async () => {
            const user = user_event_1.default.setup();
            (0, react_2.render)(<page_1.default />);
            await (0, react_2.waitFor)(() => {
                expect(react_2.screen.queryByText / Yükleniyor / );
            }).not.toBeInTheDocument();
        });
        // Make a change
        const realtimeSwitch = react_2.screen.getByRole('switch');
        await user.click(realtimeSwitch);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
        });
        // Should show unsaved changes alert
        expect(react_2.screen.getByText(/değişiklik yaptınız/)).toBeInTheDocument();
        expect(react_2.screen.getByText(/Değişiklikleri kaydetmeyi unutmayın/)).toBeInTheDocument();
    });
    it('should allow canceling all changes', async () => {
        const user = user_event_1.default.setup();
        const confirmSpy = globals_1.jest.spyOn(window, 'confirm').mockReturnValue(true);
        (0, react_2.render)(<page_1.default />);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
        });
        // Make changes
        const realtimeSwitch = react_2.screen.getByRole('switch');
        await user.click(realtimeSwitch);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
        });
        // Cancel changes
        const cancelButton = react_2.screen.getByText(/Değişiklikleri İptal Et/);
        await user.click(cancelButton);
        // Should restore original values
        expect(realtimeSwitch).not.toBeChecked();
        expect(react_2.screen.queryByText('1 değişiklik')).not.toBeInTheDocument();
        confirmSpy.mockRestore();
    });
});
describe('Responsive Design and Accessibility', () => {
    it('should render properly on different screen sizes', async () => {
        // Mock window.innerWidth for mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });
        (0, react_2.render)(<page_1.default />);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
        });
        // Should still render all essential elements
        expect(react_2.screen.getByText('FAQ Learning Ayarları')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('tabs')).toBeInTheDocument();
    });
    it('should have proper ARIA labels and accessibility features', async () => {
        (0, react_2.render)(<page_1.default />);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
        });
        // Check for proper labels
        const slider = react_2.screen.getByRole('slider');
        expect(slider).toHaveAttribute('aria-label');
        const switch_ = react_2.screen.getByRole('switch');
        expect(switch_).toHaveAttribute('aria-label');
        // Check for proper form structure
        const inputs = react_2.screen.getAllByRole('textbox');
        inputs.forEach(input => {
            expect(input).toHaveAttribute('id');
        });
    });
});
describe('Performance and Loading States', () => {
    it('should show appropriate loading states during operations', async () => {
        const user = user_event_1.default.setup();
        // Mock slow save operation
        mockFaqLearningService.bulkUpdateConfig.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({
            success: true,
            message: 'Success',
            results: []
        }), 100)));
        (0, react_2.render)(<page_1.default />);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
        });
        // Make change and save
        const realtimeSwitch = react_2.screen.getByRole('switch');
        await user.click(realtimeSwitch);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
        });
        const saveButton = react_2.screen.getByText(/Tüm Ayarları Kaydet/);
        await user.click(saveButton);
        // Should show loading state
        expect(react_2.screen.getByText(/Kaydediliyor.../)).toBeInTheDocument();
        expect(saveButton).toBeDisabled();
        // Wait for completion
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Kaydediliyor.../)).not.toBeInTheDocument();
        }, { timeout: 200 });
    });
    it('should handle rapid user interactions gracefully', async () => {
        const user = user_event_1.default.setup();
        (0, react_2.render)(<page_1.default />);
        await (0, react_2.waitFor)(() => {
            expect(react_2.screen.queryByText(/Yükleniyor/)).not.toBeInTheDocument();
        });
        // Rapidly toggle switch multiple times
        const realtimeSwitch = react_2.screen.getByRole('switch');
        await (0, react_2.act)(async () => {
            await user.click(realtimeSwitch);
            await user.click(realtimeSwitch);
            await user.click(realtimeSwitch);
        });
        // Should handle final state correctly
        expect(realtimeSwitch).toBeChecked();
        expect(react_2.screen.getByText('1 değişiklik')).toBeInTheDocument();
    });
});
;
//# sourceMappingURL=faq-learning-settings-integration.test.js.map