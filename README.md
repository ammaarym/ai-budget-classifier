# 🤖 Actual AI – Intelligent Transaction Categorization for Actual Budget

**Automate and enhance your budgeting experience with AI-powered transaction classification.**

Actual AI is a smart companion for [Actual Budget](https://actualbudget.org), designed to intelligently categorize your uncategorized transactions using LLMs like OpenAI, Anthropic, Google Generative AI, Ollama, and other compatible APIs.

---

## 🌟 Key Capabilities

### 🧠 AI-Driven Categorization
Automatically label transactions based on descriptions, amounts, and notes using large language models (LLMs). Your transaction metadata is analyzed and matched to the most fitting budget category.

### 🔄 Automatic Syncing
Ensure your account data is up-to-date by syncing before each classification run.

### ⏱ Scheduled Classification
Run categorization on a regular schedule using cron syntax. Define how frequently classifications should occur with `CLASSIFICATION_SCHEDULE_CRON`.

### ❌ Smart Skipping
Transactions that can't be categorized are tagged with `"not guessed"` in the notes. These are skipped in future runs to save processing time.

### ✅ Traceable Classifications
Classified transactions are clearly marked in their notes, making it easy to review and audit AI guesses later.

### 🌱 Expand Your Categories
Let the AI suggest entirely new budget categories when existing ones don't fit. With a simple toggle, it can even create them for you automatically.

### 🔍 Context from the Web
Enable web lookups for unfamiliar merchants using the **ValueSerp API**, giving the AI more context to make accurate classification decisions.

### 💡 Free Search Option
Prefer a zero-cost option? Enable DuckDuckGo-based merchant lookups using `freeWebSearch`, which requires no API key or external service.

### 🔁 Retry Unclassified Entries
Missed some transactions? You can reprocess previously skipped or unclassified ones with a single feature flag.

---

## 🚀 Quick Start with Docker

Use the following `docker-compose.yml` snippet to get started:

```yaml
services:
  actual_server:
    image: docker.io/actualbudget/actual-server:latest
    ports:
      - '5006:5006'
    volumes:
      - ./actual-data:/data
    restart: unless-stopped

  actual-ai:
    image: docker.io/sakowicz/actual-ai:latest
    restart: unless-stopped
    environment:
      ACTUAL_SERVER_URL: http://actual_server:5006
      ACTUAL_PASSWORD: your_actual_password
      ACTUAL_BUDGET_ID: your_actual_budget_id
      CLASSIFICATION_SCHEDULE_CRON: 0 */4 * * *
      LLM_PROVIDER: openai
      FEATURES: '["classifyOnStartup", "syncAccountsBeforeClassify", "freeWebSearch", "suggestNewCategories"]'
#     VALUESERP_API_KEY: your_valueserp_api_key
#     OPENAI_API_KEY: your_openai_api_key
#     OPENAI_MODEL: gpt-4o-mini
#     OPENAI_BASE_URL: http://ollama:11424/v1
#     ANTHROPIC_API_KEY: your_anthropic_api_key
#     ANTHROPIC_MODEL: claude-3-5-sonnet-latest
#     GOOGLE_GENERATIVE_AI_API_KEY: your_google_api_key
#     GOOGLE_GENERATIVE_AI_MODEL: gemini-1.5-flash
#     OLLAMA_MODEL: llama3.1
#     OLLAMA_BASE_URL: http://localhost:11434/api
#     GROQ_API_KEY: your_groq_api_key
#     GROQ_MODEL: mixtral-8x7b-32768
#     ACTUAL_E2E_PASSWORD: your_encryption_password
#     NODE_TLS_REJECT_UNAUTHORIZED: 0
#     GUESSED_TAG: #actual-ai
#     NOT_GUESSED_TAG: #actual-ai-miss
