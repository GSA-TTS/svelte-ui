# Svelte UI Component Library Development Container

FROM node:26-slim

# Set working directory
WORKDIR /workspace

# Install basic utilities
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -s /bin/bash developer && \
    chown -R developer:developer /workspace

USER developer

# Expose port for Storybook
EXPOSE 6006

CMD ["/bin/bash"]
