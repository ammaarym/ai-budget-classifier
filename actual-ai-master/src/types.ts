import { LanguageModel, Tool } from 'ai';
import {
  APIAccountEntity,
  APICategoryEntity as ImportedAPICategoryEntity,
  APICategoryGroupEntity as ImportedAPICategoryGroupEntity,
  APIPayeeEntity,
} from '@actual-app/api/@types/loot-core/src/server/api-models';
import {
  TransactionEntity, RuleEntity, CategoryEntity, CategoryGroupEntity,
} from '@actual-app/api/@types/loot-core/src/types/models';

export type APICategoryEntity = ImportedAPICategoryEntity | CategoryEntity;
export type APICategoryGroupEntity = ImportedAPICategoryGroupEntity | CategoryGroupEntity;

export interface LlmModelI {
  ask(prompt: string, possibleAnswers: string[]): Promise<string>;
}

export interface LlmModelFactoryI {
  create(): LanguageModel;
  getProvider(): string;
  isFallbackMode(): boolean;
  getModelProvider(): string;
}

export interface ActualApiServiceI {
  initializeApi(): Promise<void>;

  shutdownApi(): Promise<void>;

  getCategoryGroups(): Promise<APICategoryGroupEntity[]>

  getCategories(): Promise<(APICategoryEntity | APICategoryGroupEntity)[]>

  getAccounts(): Promise<APIAccountEntity[]>

  getPayees(): Promise<APIPayeeEntity[]>

  getTransactions(): Promise<TransactionEntity[]>

  getRules(): Promise<RuleEntity[]>

  getPayeeRules(payeeId: string): Promise<RuleEntity[]>

  updateTransactionNotes(id: string, notes: string): Promise<void>

  updateTransactionNotesAndCategory(
    id: string,
    notes: string,
    categoryId: string,
  ): Promise<void>

  runBankSync(): Promise<void>

  createCategory(name: string, groupId: string): Promise<string>

  createCategoryGroup(name: string): Promise<string>

  updateCategoryGroup(id: string, name: string): Promise<void>
}

export interface TransactionServiceI {
  processTransactions(): Promise<void>;
}

export interface NotesMigratorI {
  migrateToTags(): Promise<void>;
}

export interface ActualAiServiceI {
  classify(): Promise<void>;

  syncAccounts(): Promise<void>
}

export interface RuleDescription {
  ruleName: string;
  conditions: {
    field: string;
    op: string;
    type?: string;
    value: string | string[];
  }[];
  categoryName: string;
  categoryId: string;
  index?: number;
}

export interface CategorySuggestion {
  name: string;
  groupName: string;
  groupIsNew: boolean;
}

export interface UnifiedResponse {
  type: 'existing' | 'new' | 'rule';
  categoryId?: string;
  ruleName?: string;
  newCategory?: CategorySuggestion;
}

export interface LlmServiceI {
  ask(prompt: string): Promise<UnifiedResponse>;
}

export interface ToolServiceI {
  getTools(): Record<string, Tool>;
}

export interface PromptGeneratorI {
  generate(
    categoryGroups: APICategoryGroupEntity[],
    transaction: TransactionEntity,
    payees: APIPayeeEntity[],
    rules: RuleEntity[],
  ): string;
}

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface ProcessingStrategyI {
  process(
      transaction: TransactionEntity,
      response: UnifiedResponse,
      categories: (APICategoryEntity | APICategoryGroupEntity)[],
      suggestedCategories: Map<string, {
        name: string;
        groupName: string;
        groupIsNew: boolean;
        groupId?: string;
        transactions: TransactionEntity[];
      }>
  ): Promise<void>;
  isSatisfiedBy(response: UnifiedResponse): boolean;
}
